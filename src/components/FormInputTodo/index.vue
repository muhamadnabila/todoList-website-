<template>
    <form @submit.prevent="submitTodo" class="form_input-todo">
        <Error v-if="notifError" msg="Can not create todo, please try again"/>
        <input required v-model="title" placeholder="What is to be done?" />
        <textarea required v-model="note" rows="3" placeholder="Do you have a note for it?"/>
        <label>How important is it?</label>
        <vSelect :value="priority" @input="setPriority" :options="priorityOptions" placeholder="set priority" class="input__priority"/>
        <button type="submit" class="button__submit" v-if="!isLoadingCreateTodo">Submit Task</button>
        <button @click.prevent="$emit('setIsEditTodoActive')" class="button__cancel" v-if="!isLoadingCreateTodo && $props.tempDataEditTodo.title">Cancel</button>
        <Loader v-if="isLoadingCreateTodo" />
    </form>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import axios from '../../utils/api.js'
import Error from '../Notification/error'
import Loader from '../Loader/index'

export default {
    name: 'FormInputTodo',
    props: {
        msg: String,
        tempDataEditTodo: Object,
    },
    components: {
        vSelect,
        Error,
        Loader
    },
    data() {
        return {
            priorityOptions: ['low', 'medium', 'high'],
            title: '',
            note: '',
            priority: null,
            notifError: false,
            isLoadingCreateTodo: false
        }
    },
    created() {
        {/**
            check this component for edit todo or create todo
            if for editing todo, then fill the existing data to form input 
        */}
        const {title, note, priority} = this.$props.tempDataEditTodo
        if(title) {
            this.title = title 
            this.note = note 
            this.priority = priority
        }
    },
    methods: {
        setPriority: function(value) {
            {/**
                set priority to be low, medium, or high 
            */}

            if(!value) return;
            this.priority = value === 'low' ? 1 : value === 'medium' ? 2 : 3 
        },
        submitTodo: function () {
            {/**
                handle submit todo after fill all the input with 2 conditionals
                1. check this submit for edit todo
                2. check this submit for add new todo
            */}

            this.isLoadingCreateTodo = true
            if(this.$props.tempDataEditTodo.title) this.submit(`todo/${this.$props.tempDataEditTodo.id}`,'PUT')
            else this.submit('todo','POST')
        },
        submit: function(url, method) {
            {/**
                send the data to server
            */}
            
            axios({ url,
                    data: { 
                        title: this.title, 
                        note: this.note, 
                        priority: this.priority
                    }, 
                    method
                })
            .then(({data: {data}}) => {
                this.isLoadingCreateTodo = false
                if(this.$props.tempDataEditTodo.title) {
                    this.$emit('submitEditTodo', data)
                } else {
                    this.$emit('submitAddNewTodo', data)
                }
            })
            .catch(() => {
                this.isLoadingCreateTodo = false 
                this.notifError = true
            });
        },
    }
}
</script>

<style scoped>
.form_input-todo{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background:#ebebeb;
    padding: 10px;
    position: relative;
}
input {
    height: 30px;
    padding: 0 10px;
    outline: none;
}
textarea {
    padding: 10px 10px;
    outline: none;
}
label {
    margin-top: 10px;
    margin-left: 10px;
}
.input__priority {
    background: #fcf4f4;
    width: 150px;
    margin-top: 10px;
    margin-left: 10px;
}
button {
    height: 30px;
    margin-top: 10px;
    border: none;
    color: white;
    cursor: pointer;
    outline: none;
}
button:hover {
    opacity: 0.8;
}
.button__submit {
    background: #0228ea;
}
.button__cancel {
    background: red;
}
</style>
