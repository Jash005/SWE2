<template>
  <div class="not-found">
    <h1>404 - Oops! Seite nicht gefunden</h1>
    <p>Es sieht so aus, als ob du dich verlaufen hast...</p>

    <div class="not-found-card">
      <vue-flip active-click="true" width="200px" height="250px">
        <!-- This line is required because the library expects the attribute on the template tag -->
        <!-- eslint-disable-next-line vue/no-useless-template-attributes -->
        <template v-slot:front class="front">
          Bitte Klicken, für den Fall das du nicht mehr weiter weißt
        </template>
        <!-- This line is required because the library expects the attribute on the template tag -->
        <!-- eslint-disable-next-line vue/no-useless-template-attributes -->
        <template v-slot:back class="back">
          Bitte nochmals Klicken wenn du weiterhin nicht weiter weißt <br> <i>(du kommst hier nicht mehr raus)</i>
        </template>
      </vue-flip>
    </div> <!-- END .not-found-card -->

    <router-link to="/" class="home-link">Zurück zur Startseite</router-link>
  </div> <!-- END .not-found -->
</template>

<script>
import { VueFlip } from 'vue-flip';

export default {
  name: 'NotFound',
  components: {
    'vue-flip': VueFlip
  },
  mounted() {
    console.log('NotFound component mounted');
  },
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
  font-family: 'Arial', sans-serif;
}

.not-found h1 {
  font-size: 48px;
  color: var(--general-font-header);
  margin-bottom: 20px;
}

.not-found p {
  font-size: 18px;
  color: var(--general-font);
  margin-bottom: 30px;
}

.not-found img {
  max-width: 300px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.not-found-card {
  margin: 40px auto;
  text-align: -webkit-center;
}

.home-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--button);
  color: var(--button-font);
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.home-link:hover {
  background-color: var(--general-font-hover);
  transform: translateY(-3px);
}
</style>