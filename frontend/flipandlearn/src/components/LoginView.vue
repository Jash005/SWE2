<template>
  <div class="user-view">
    <h1>{{ isLogin ? "Login" : "Registrieren" }}</h1>

    <form @submit.prevent="handleSubmit">
      <BaseInputField v-model="username" label="Benutzername" placeholder="Dein Benutzername"
                      :validation="usernameValidation" />

      <BaseInputField v-model="password" label="Passwort" type="password" placeholder="Dein Passwort"
                      :validation="passwordValidation" />

      <BaseInputField v-if="!isLogin" v-model="displayName" label="Anzeigename" placeholder="Dein Anzeigename"
                      :validation="validateDisplayName" />

      <button type="submit">{{ isLogin ? "Einloggen" : "Registrieren" }}</button>
    </form>

    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
    <div class="success-message" v-if="successMessage">{{ successMessage }}</div>

    <p @click="toggleMode">
      {{ isLogin ? "Noch keinen Account? Registriere dich!" : "Schon registriert? Jetzt einloggen!" }}
    </p>
  </div>
</template>


<script>
import BaseInputField from './BaseInputField.vue';
import api from "../plugins/axios.js";
import { useAuthStore } from '../stores/auth-store.js';

export default {
  name: 'LoginView',
  components: {
    BaseInputField,
  },
  data() {
    return {
      isLogin: true,
      username: '',
      displayName: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  computed: {
    usernameValidation() {
      return this.isLogin ? undefined : this.validateUsername;
    },
    passwordValidation() {
      return this.isLogin ? undefined : this.validatePassword;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.isLogin) {
        const token = btoa(`${this.username}:${this.password}`);
        try {
          const response = await api.post("/users/login", {}, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });

          if (response.status === 200) {
            this.successMessage = "Erfolgreich eingeloggt! Viel Spaß beim Spiel!";
            const authStore = useAuthStore();
            authStore.setUser({ password: this.password, ...response.data });

            this.username = "";
            this.password = "";

            setTimeout(() => {
              this.$router.push("/profil");
            }, 1000);            
          }
        } catch (error) {
          console.error("Error while logging in:", error);
          if (error.response?.status === 401) {
            this.errorMessage = "Benutzername oder Passwort ist ungültig.";
          } else if (error.response?.status === 404) {
            this.errorMessage = "Benutzername nicht gefunden. Bitte registriere dich.";
          } else {
            this.errorMessage = "Es gab ein Problem beim Login. Versuche es später erneut.";
          }
        }
      } else {
        // Registrierung
        try {
          const response = await api.post("/users", {
            username: this.username,
            password: this.password,
            displayName: this.displayName
          });

          if (response.status === 201) {
            this.successMessage = "Registrierung erfolgreich! Du wirst zum Login weitergeleitet...";

            this.username = "";
            this.password = "";
            this.displayName = "";

            setTimeout(() => {
              this.toggleMode();
            }, 2000);
          }
        } catch (error) {
          console.error("Fehler bei Registrierung:", error);
          if (error.response?.status === 409) {
            this.errorMessage = "Benutzername ist bereits vergeben.";
          } else if (error.response?.status === 400) {
            this.errorMessage = error.response?.data?.message || "Ungültige Eingaben.";
          } else {
            this.errorMessage = "Registrierung fehlgeschlagen. Versuche es später erneut.";
          }
        }
      }
    },

    toggleMode() {
      this.isLogin = !this.isLogin;
      this.username = "";
      this.displayName = "";
      this.password = "";
      this.errorMessage = "";
      this.successMessage = "";
    },

    validateUsername(value) {
      const usernameRegex = /^[a-zA-Z0-9]{4,10}$/;
      return usernameRegex.test(value)
          ? ""
          : "Benutzername muss 4–10 Zeichen lang sein und darf nur Buchstaben und Zahlen enthalten.";
    },

    validatePassword(value) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
      return passwordRegex.test(value)
          ? ""
          : "Passwort muss 8–16 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl und eines der Zeichen !@#$%^&* enthalten.";
    },

    validateDisplayName(value) {
      return value.length >= 4 && value.length <= 30
          ? ""
          : "Anzeigename muss zwischen 4 und 30 Zeichen lang sein.";
    }
  }
};
</script>


<style scoped>
.user-view {
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  background-color: var(--box);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.user-view h1 {
  color: var(--general-font);
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 600;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


button {
  background-color: var(--button);
  color: var(--button-font);
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 16px;
  font-weight: 500;
}

button:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
}

p {
  margin-top: 20px;
  color: var(--general-font);
  cursor: pointer;
  font-size: 14px;
}

p:hover {
  color: var(--general-font-hover);
}

.error-message {
  color: red;
  background: #ffe0e0;
  padding: 10px;
  min-height: 1.2em;
  text-align: left;
  max-width: 500px;
  margin: 10px auto;
}

.success-message {
  color: green;
  background: rgb(179, 255, 179);
  padding: 10px;
  min-height: 1.2em;
  text-align: left;
  max-width: 500px;
  margin: auto;
  margin-top: 10px;
}
</style>