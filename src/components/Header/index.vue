<template>
    <div 
        class="header" 
        :class="{headerCenter: ($resize && $mq.below(675) && !isAuthenticated) }"
    >
        <h1 class="text-title" :class="{'text-title--hide': ($resize && $mq.below(675) && isAuthenticated)}">TodoList</h1>
        <div v-if="isAuthenticated" class="wrapper__search">
            <i class="fa fa-search"></i>
            <input @input="handleSearchTodo($event)" class="input__search" placeholder="Find Task ..." />
        </div>
        <button v-if="isAuthenticated" @click="logout" class="button__logout">Logout</button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_LOGOUT } from "../../store/actions/auth";
import { TODO_SEARCH } from "../../store/actions/todo";

export default {
    name: 'Header',
    props: {
        msg: String
    },
    data() {
        return {
            search: ''
        }
    },
    methods: {
        // handle logout
        logout: function() {
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
        },
        // handle search todo
        handleSearchTodo: function(event) {
            this.$store.dispatch(TODO_SEARCH, {payload: event.target.value});
        }

    },
    computed: {
        // get isAuthenticated data from store
        ...mapGetters(["isAuthenticated"]),
    },
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 50px;
    background: rgb(0, 0, 0);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
}
.input__search {
    padding-left:15px;
    font-weight: bold;
    border: none;
    color: grey;
    width: 500px;
    height: 100%;
    font-size: 16px;
}
.input__search:focus {
    outline: none;
}
.text-title {
    margin: 0;
    color: rgb(251 251 251);
}
.wrapper__search {
    background: rgb(255 255 255);
    padding: 5px;
}
.button__logout {
    font-weight: bold;
    height: 25px;
    border: none;
    outline: none;
    color: white;
    background: inherit;
}
.button__logout:hover {
    color:rgb(201, 198, 198)
}
@media all and (max-width: 1000px) {
    .input__search {
        width: 400px;
    }
}
@media all and (max-width: 670px) {
    .header {
        padding: 10px;
    }
    .headerCenter {
        justify-content: center
    }
    .input__search {
        width: 250px;
    }
    .text-title--hide {
        display: none
    }
}
</style>
