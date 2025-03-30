<template>
    <div id="flex-container">
        <div v-if="$route.path !== '/'" id="navigation">
            <NaviagtionBar />
        </div> <!-- ENDE navigation -->

        <div id="content">
            <RouterView />
        </div> <!-- ENDE content -->
    </div> <!-- ENDE flex-container -->
</template>

<script>
import NaviagtionBar from './NavigationBar.vue';

export default {
    name: 'MainView',
    components: {
        NaviagtionBar
    }
}
</script>

<style scoped>
#flex-container {
    display: flex;
    flex-direction: column-reverse;
    min-height: 100vh;
}

#navigation {
    min-height: 5vh;
    background-color: lightcoral;
}

#content {
    flex: 1;
    background-color: lightgreen;
}



@media (min-width: 768px) {
    #flex-container {
        flex-direction: row;
    }

    #content {
        padding: 1vh 1vw;
    }

    #navigation {
        min-height: 100vh;
    }
}
</style>