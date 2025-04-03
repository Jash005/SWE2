<template>
  <nav id="navigation-bar">
    <router-link to="/" class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" />
      <h1>FLIP & LEARN</h1>
    </router-link>

    <ul>
      <li><router-link to="/game">Spielen</router-link></li>
      <li><router-link to="/profil">Profil</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
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
  padding: 20px;
  gap: 40px;
  min-height: 100vh;
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
  writing-mode: vertical-rl;
  transform: rotate(180deg);
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

</style>
