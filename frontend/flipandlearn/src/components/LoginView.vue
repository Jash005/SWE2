<template>
  <div class="user-view">
    <h1>{{ isLogin ? "Login" : "Registrieren" }}</h1>

    <form @submit.prevent="handleSubmit">
      <BaseInputField v-model="username" label="Benutzername" placeholder="Dein Benutzername" />

      <BaseInputField v-if="!isLogin" v-model="email" label="E-Mail" type="email" placeholder="Deine E-Mail"
        :validation="validateEmail" />

      <BaseInputField v-model="password" label="Passwort" type="password" placeholder="Dein Passwort" />

      <button type="submit">{{ isLogin ? "Einloggen" : "Registrieren" }}</button>
    </form>

    <p @click="toggleMode">
      {{ isLogin ? "Noch keinen Account? Registriere dich!" : "Schon registriert? Jetzt einloggen!" }}
    </p>
  </div>
</template>

<script>
import BaseInputField from './BaseInputField.vue';

export default {
  name: 'LoginView',
  components: {
    BaseInputField,
  },
  data() {
    return {
      isLogin: true, // true for login, false for register
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      if (this.isLogin) {
        console.log("Login mit:", this.username, this.password);
        // TODO implement login logic, verification and API call
      } else {
        console.log("Registrierung mit:", this.username, this.email, this.password);
        // TODO implement registration logic, verification and API call
      }
    },
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.username = "";
      this.email = "";
      this.password = "";
    },
    validateEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? "" : "Bitte eine gültige E-Mail-Adresse eingeben";
    }
  }
};
</script>