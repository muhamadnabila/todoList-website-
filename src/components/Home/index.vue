<template>
    <div>
        <div @click="handleClickAddNewTask" class="card__task card__create-task">
            {{!isEditTodoActive ? '+ Add new task' : 'Edit task'}}
        </div>
        <FormInputTodo 
            @setIsEditTodoActive="setIsEditTodoActive" 
            @submitAddNewTodo="submitAddNewTodo" 
            @submitEditTodo="submitEditTodo" 
            :tempDataEditTodo="tempDataEditTodo" 
            v-if="isCreateTodoActive || isEditTodoActive" />
        <Error v-if="notifError" msg="error. Please try again"/>
        <Loader v-if="isLoadingFetchTodo" />
        <Card @deleteTodo="deleteTodo" @editTodo="editTodo" @updateTodoStatus="updateTodoStatus" v-for="(todo) in todos" :key="todo.id" :todo="todo"/>
        <button @click="handleClearCompletedTodo" class="button__completed-task button--clear">CLEAR COMPLETED TASKS</button>
    </div>
</template>

<script>
import Card from '../Card/index.vue'
import FormInputTodo from '../FormInputTodo/index.vue'
import Error from '../Notification/error.vue'
import axios from '../../utils/api.js'
import Loader from '../Loader/index'

export default {
    name: 'Home',
    components: {
        Card,
        FormInputTodo,
        Error,
        Loader
    },
    data() {
        return {
            isCreateTodoActive: false,
            isEditTodoActive: false,
            todos: [],
            isLoadingFetchTodo: false,
            isLoadingCreateTodo: false,
            notifError: false,
            tempDataEditTodo: {}
        }
    },
    created () {
        this.isLoadingFetchTodo = true

        {/**
            fetch all the user todos
        */}
        
        axios({ url: "todo/user", method: "GET"})
            .then(({data: {data}}) => {
                this.todos = data.sort((a,b) => (a.isDone > b.isDone) ? 1 : ((b.isDone > a.isDone) ? -1 : 0)); 
                this.isLoadingFetchTodo = false
            })
            .catch(() => {
                this.isLoadingFetchTodo = false
                this.notifError = true
            });
    },
    watch: {
        // listen any changes for search input
        '$store.state.todo.todosSearch'(result) {
            this.todos = result
        }
    },
    methods: {
        // handle when user click button add new todo
        handleClickAddNewTask: function() {
            if(!this.isEditTodoActive) this.isCreateTodoActive = !this.isCreateTodoActive
        },
        // handle when user submit to submit add new todo and push a new todo to state
        submitAddNewTodo: function(payload) {
            this.isCreateTodoActive = false
            this.todos.push({
                id: payload.id,
                title: payload.title,
                note: payload.note,
                isDone: payload.isDone,
                priority: payload.priority,
                user_id: payload.user_id,
                createdAt: payload.createdAt,
                updatedAt: payload.updatedAt
            })
        },
        // handle when user click button submit edit todo and change the data in state
        submitEditTodo: function(payload) {
            this.isEditTodoActive = false
            this.todos = this.todos.map(todo => {
                        if(todo.id === payload.id) {
                            return {
                            ...todo,
                            id: payload.id,
                            title: payload.title,
                            note: payload.note,
                            isDone: payload.isDone,
                            priority: payload.priority,
                            user_id: payload.user_id,
                            createdAt: payload.createdAt,
                            updatedAt: payload.updatedAt
                            }
                        }else return todo
                    })
        },
        // handle delete all completed todos
        handleClearCompletedTodo() {
            let newTodo = []
            this.todos.forEach(async(todo) => {
                if(todo.isDone) {
                    await axios({ url: `todo/${todo.id}`, method: "DELETE"})
                    .then( () => {})
                    .catch(() => {
                        newTodo.push(todo)
                    });
                }else {
                    newTodo.push(todo)
                }
            })
            this.todos = newTodo
        }, 
        // handle todo status to be done / undone when click on the checkbox on card
        updateTodoStatus: function(todoId, value) {
            axios({ url: `todo/${todoId}`,data: {isDone: value}, method: "PUT"})
                .then(() => {
                    this.todos = this.todos.map(todo => {
                        if(todo.id === todoId) {
                            return {
                            ...todo,
                            isDone : value
                            }
                        }else return todo
                    })
                })
                .catch(() => {
                    this.notifError = true
                });
        },
        // handle delete a todo from expand card detail
        deleteTodo: function(todoId) {
            axios({ url: `todo/${todoId}`, method: "DELETE"})
                .then(() => {
                    this.todos = this.todos.filter(todo => todo.id !== todoId)
                })
                .catch(() => {
                    this.notifError = true
                });
        },
        // handle when user click edit button from expand card detail and put all the data to form input todo
        editTodo: function(todo) {
            if(!this.isCreateTodoActive) {
                this.tempDataEditTodo = todo
                this.isEditTodoActive = true
            }
        },
        // handle open the form input todo for updating data
        setIsEditTodoActive: function() {
            this.isEditTodoActive = false
            this.tempDataEditTodo = {}
        }
    }    
}
</script>

<style>
* {
    box-sizing: border-box;
} 
.card__task {
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    background: #ffffff;
    box-shadow: 0 0 2px 1px #dfdcdc;
    position: relative
}
.card__create-task {
    background: rgb(0, 0, 0);
    color: #f8f8f8;
    opacity: 0.7;
    cursor: pointer;
}
.card__create-task:hover {
    opacity: 0.6;
}
.button__completed-task {
    border: none;
    width: 100%;
    height: 30px;
    margin: 10px 0;
    font-weight: bold;  
    cursor: pointer;
    outline: none;
}
.button__completed-task:hover {
    color: #ffffff;
    background: rgb(0, 0, 0);
}
.button--clear {
    color: red;
}
.button--clear:hover {
    background: red;
    color: #ffffff;
}

</style>
