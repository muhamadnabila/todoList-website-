<template>
  <div id="app">
    <Header />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Header from './components/Header/index.vue'
  import axios from './utils/api.js'
  import { mapGetters } from "vuex";

  export default {
    name: 'App',
    components: {
      Header,
    },
    data() {
      return {
      }
    },
    created() {
      {/**
        check authenticated user from localstorage when first come to TodoList App
      */}
      if(this.isAuthenticated) {
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('user-token')
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated"]),
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  } 
  body{
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f8f8f8;
    min-height: 100vh
  }
  .main-content {
    margin: 60px 300px 0px 300px;
    position: relative;
  }
  .card__task {
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    background: #ffffff;
    box-shadow: 0 0 2px 1px #dfdcdc;
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
@media all and (max-width: 1000px) {
    .main-content {
      margin: 70px 100px 0px 100px;
    }
}
@media all and (max-width: 670px) {
    .main-content {
      margin: 70px 10px 0px 10px;
    }
}
</style>
