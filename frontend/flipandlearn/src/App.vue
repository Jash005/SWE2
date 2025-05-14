<template>
  <MainView />
</template>

<script>
import MainView from './components/MainView.vue';

export default {
  name: 'App',
  components: {
    MainView
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: var(--background);
  color: var(--general-font);
  font-family: 'Poppins', sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>