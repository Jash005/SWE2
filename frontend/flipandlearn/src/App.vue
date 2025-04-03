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

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px var(--input-field) inset !important;
  -webkit-text-fill-color: var(--general-font) !important;
  transition: background-color 5000s ease-in-out 0s;
}

input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px var(--input-field) inset !important;
  -webkit-text-fill-color: var(--general-font) !important;
}
</style>