<template>
    <div>
        <h1>{{isPageActive === 'Login' ? 'Login': 'Sign up'}}</h1>
        <form class="form__login" @submit.prevent="handleSubmit">
            <Error v-if="errorLogin" msg="Username or Password Invalid"/> 
            <label v-if="isPageActive==='Sign up'">Name</label>
            <input 
                required 
                v-model="name" 
                v-if="isPageActive==='Sign up'"
                type="text" 
                placeholder="Your name"
            />
            <label>Email</label>
            <input 
                required 
                v-model="email" 
                type="text" 
                placeholder="email@example.com"
            />
            <label>Password </label>
            <input 
                required 
                v-model="password"
                type="password"
                placeholder="At least 3 characters"
            />
            <button type="submit">{{isPageActive === 'Login' ? 'Login': 'Sign up'}}</button>
            <span>Don't have an account ? <a href="#" @click="handleChangePage">{{isPageActive === 'Login' ? 'Sign up': 'Login'}}</a></span>
        </form>
    </div>
</template>

<script>
import { AUTH_REQUEST } from "../../store/actions/auth";
import { mapState } from "vuex";
import Error from '../Notification/error'

export default {
    name: 'Signin',
    components: {
        Error
    },
    props: {
        msg: String
    },
    data() {
        return  {
            email: '',
            password: '',
            name: '',
            isPageActive: 'Login'
        }
    },
    methods: {
        handleChangePage: function() {
            {/**
                handle change page to be login page or sign up page 
            */}
            this.isPageActive = this.isPageActive === 'Login' ? 'Sign up' : 'Login'
        },
        handleSubmit: function() {
            {/**
                handle submit input after fill all the input and send data to server through store(action) 
            */}
            const { name, email, password } = this;
            this.$store.dispatch(AUTH_REQUEST, { name, email, password})
                .then(() => {
                    this.$router.push('/')
                })
        }
    },
    computed: {
    ...mapState({
            //check login/register failed
            errorLogin: state => state.auth.status === 'error' 
        })
    }
}
</script>

<style scoped>
.notif__error{
    color: red
}
h1{
    text-align: center;
}
.form__login {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 500px;
    margin: 0 auto;
    position: relative;
}
label {
    margin-top: 10px
}
button {
    margin-top: 10px;
    background: #0f37c9;
    border: none;
    border-radius: 10px;
    height: 30px;
    font-weight: bold;
    color: white;
}
button:hover{
    opacity: 0.8;
}
input {
    border: none;
    border-bottom: 1px solid black;
    background: inherit;
    margin-top: 5px;
    outline: none;
}
span {
    margin-top: 5px;
    font-size:14px;
    text-align: center;
}
@media all and (max-width: 670px) { 
    .form__login{
        width: 350px;
    }
}

</style>
