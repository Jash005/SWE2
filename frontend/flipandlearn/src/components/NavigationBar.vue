<template>
    <article id="navigation-bar">
        Navigation works
        <!-- Logo -->

        <!-- Home Button - go to MainView -->
        <router-link to="/">Home</router-link>

        <!-- Profil Button - if not logged in go to login else go to profile -->
        <router-link to="/profil">Profil</router-link>
        <router-link to="/login">Login</router-link>
    </article>
</template>

<script>
export default {
    name: 'NavigationBar',
}
</script>

<style scoped></style>
