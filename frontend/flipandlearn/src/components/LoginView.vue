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
      isLogin: true,
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

<style scoped>
.user-view {
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  background-color: var(--boxes);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.user-view h1 {
  color: var(--white-font);
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 600;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input {
  padding: 12px;
  background-color: #1e1e1e;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--white-font);
  font-size: 15px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input:focus {
  background-color: #222;
  border-color: var(--bright-font);
  outline: none;
}

button {
  background-color: var(--bright-font);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 16px;
  font-weight: 500;
}

button:hover {
  background-color: var(--bright-font-hover);
  transform: translateY(-2px);
}

p {
  margin-top: 20px;
  color: var(--white-font);
  cursor: pointer;
  font-size: 14px;
}

p:hover {
  color: var(--bright-font);
}
</style>
