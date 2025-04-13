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
  flex-direction: column;
  min-height: 100vh;
}

#navigation {
  min-height: 5vh;
  background-color: var(--background);
  color: var(--general-font);
}

#content {
  flex: 1;
  padding: 20px;
}

@media (min-width: 768px) {
  #flex-container {
    flex-direction: row;
  }

  #content {
      padding: 1vh 1vw;
  }

  #navigation {
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
}
</style>