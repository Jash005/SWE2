<template>
  <nav id="navigation-bar">
    <router-link to="/" class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" />
      <h1>FLIP & LEARN</h1>
    </router-link>

    <ul>
      <li><router-link to="/game">Spielen</router-link></li>
      <li>
        <router-link
          :to="isLoggedIn ? '/profil' : '/login'"
          @click.prevent="redirectToProfile"
        >
          Profil
        </router-link>
      </li>
      <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
      <li v-else>
        <button class="logout-button" @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "vue-router";

export default {
  name: "NavigationBar",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    // Logout-Funktion
    const logout = () => {
      authStore.logout();
      window.location.reload(); // Optional: Seite neu laden oder zur Login-Seite navigieren
    };

    // Redirect-Funktion für Profil
    const redirectToProfile = () => {
      if (authStore.isLoggedIn) {
        router.push("/profil");
      } else {
        router.push("/login");
      }
    };

    return {
      logout,
      isLoggedIn: authStore.isLoggedIn,
      redirectToProfile,
    };
  },
};
</script>

<style scoped>
#navigation-bar {
  background-color: var(--navbar-background);
  color: var(--navbar-font);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.logo-container img {
  width: 60px;
  height: 60px;
}

.logo-container h1 {
  margin: 10px;
  color: var(--navbar-font);
  font-size: 26px;
  letter-spacing: 4px;
  text-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.3);
}

.logo-container:hover h1 {
  color: var(--navbar-font-hover);
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

a {
  color: var(--navbar-font);
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  text-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.3);
}

a:hover {
  color: var(--navbar-font-hover);
}

.logout-button {
  background-color: var(--button-danger);
  color: var(--navbar-font);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: var(--button-danger-hover);
}

@media (min-width: 768px) {
  #navigation-bar {
    min-height: 100vh;
    gap: 40px;
    padding: 20px;
  }
  .logo-container h1 {
    margin: 30px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
}
</style>