<template>
  <article id="home-view">
    <img
        src="@/assets/logo.png"
        alt="Logo"
        :class="['logo', { animate: animateLogo }]"
        @animationend="animationEnd"
    />
    <router-link to="/" class="title-link" @click="replayAnimation">FLIP & LEARN</router-link>

    <nav>
      <ul>
        <li><router-link to="/game">Spielen</router-link></li>
        <li><router-link to="/profil">Profil</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </article>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      animateLogo: true,
    };
  },
  methods: {
    replayAnimation() {
      this.animateLogo = false;
      this.$nextTick(() => {
        this.animateLogo = true;
      });
    },
    animationEnd() {
      this.animateLogo = false;
    },
  },
  mounted() {
    this.animateLogo = true;
  },
};
</script>

<style scoped>
#home-view {
  color: var(--general-font);
  min-height: 70vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 100px;
  margin-bottom: 10px;
}

.animate {
  animation: slideDown 1s ease-out;
}

@keyframes slideDown {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.title-link {
  color: var(--navbar-font-header);
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-top: 10px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.title-link:hover {
  color: var(--navbar-font-hover);
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
}

nav li {
  color: var(--general-font);
}

a {
  color: var(--home-font);
  text-decoration: none;
  font-size: 16px;
}

a:hover {
  color: var(--home-font-hover);
}
</style>
