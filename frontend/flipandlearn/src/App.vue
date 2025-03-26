<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <start msg="Welcome to Your Vue.js App"/>
</template>

<script>
import start from './components/HomeView.vue'
import register from './components/RegisterView.vue'
import login from './components/LoginView.vue'

export default {
  name: 'App',
  components: {
    start
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
