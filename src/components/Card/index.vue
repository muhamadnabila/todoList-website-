<template>
    <div>
        <div 
            class="card__task" 
            :class="{'card--prior1': todo.priority == 1, 'card--prior2': todo.priority == 2, 'card--prior3': todo.priority == 3}"
            @click.self="handleExpandCard"
        >
            <Error v-if="notifError" msg="Can not update card status, please try again" />
            <input @change="handleChangeTodoStatus($event)" type="checkbox" id="checkbox" v-model="checked">
            <p>{{todo.title}}</p>
            <hr v-if="checked"/>
        </div>
        <div v-if="isExpandCard" class="card__detail-task">
            <p class="text__detail-task">{{todo.note}}</p>
            <p class="text__detail-task text__medium">Priority: {{todo.priority && todo.priority === 1 ? 'low': todo.priority === 2 ? 'medium' : 'hight'}}</p>
            <p class="text__detail-task text__small">Created at: {{moment(todo.createdAt).format('MMMM Do YYYY')}}</p>
            <div class="wrapper__button">
                <button class="button__edit" @click="handleEditTodo">edit task</button>
                <button class="button__delete" @click="handleDeleteTodo">delete task</button>
            </div>
        </div>
    </div>
</template>

<script>
import Error from '../Notification/error.vue'
import moment from 'moment'

export default {
    name: 'Card',
    props: {
        todo: Object
    },
    components: {
        Error,
    },
    data() {
        return {
            checked: this.$props.todo.isDone,
            notifError: false,
            isExpandCard: false
        }
    }, 
    methods : {
        handleChangeTodoStatus: function(event) {
            {/**
                update todo status to be done or undone 
            */}
            if(event.target.checked) this.$emit('updateTodoStatus', this.$props.todo.id, true)
            else this.$emit('updateTodoStatus', this.$props.todo.id, false)
        },
        handleExpandCard: function() {
            {/**
                expand the detail card to check note, createdAt, updatedAt, show button edit and delete todo 
            */}
            this.isExpandCard = !this.isExpandCard
        },
        moment: function () {
            {/**
                handle moment for date in detail card
            */}
            return moment();
        },
        handleDeleteTodo: function() {
            {/**
                handle click on button delete todo 
            */}
            this.$emit('deleteTodo', this.$props.todo.id)
        },
        handleEditTodo: function() {
            {/**
                handle click on button edit todo 
            */}
            this.$emit('editTodo', this.$props.todo)
        }
    }
}
</script>

<style scoped>
.card--prior1 {
        border-left: 5px solid green;
}
.card--prior2 {
        border-left: 5px solid yellow;
}
.card--prior3 {
        border-left: 5px solid red;
}
.card--done {
    position: relative;
}
hr {
    border: 1px solid black;
    width: 95%;
    position: absolute;
    left: 30px;
}
.card__detail-task {
    height: 120px;
    background: #fefe8d;
    border-radius: 0px 0px 20px 20px;
    padding: 10px;
    position: relative;
}
.text__detail-task {
    margin: 0;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
}
.text__small{
    color: grey;
    font-size: 12px
}
.text__medium {
    color: grey;
    font-size: 12px;
    font-weight: bold
}
.wrapper__button {
    position: absolute;
    bottom: 10px;
    display: flex;
}
button {
    border: none;
    background: inherit;
    outline: none;
    text-decoration: underline;
    cursor: pointer;
    margin-right: 10px;
}
button:hover {
    opacity: 0.8;
}
.button__edit {
    color: green;
}
.button__delete {
    color: red;
}
@media all and (max-width: 1000px) { 
    hr{
        width: 93%
    }
}
@media all and (max-width: 670px) { 
    hr{
        width: 90%
    }
}

</style>
