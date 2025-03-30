<template>
  <article id="home-view">
    home works
    <h1>FLIP and LEARN</h1>

    <nav>
      <ul>
        <li><router-link to="/game">Game</router-link></li>
        <li><router-link to="/card-management">Card Management</router-link></li>

        <!-- IF User logged in go to /profil ELSE go to /login -->
        <li><router-link to="/profil">Profil</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </article>

</template>

<script>

export default {
  name: 'HomeView',
}

</script>

<style scoped></style>