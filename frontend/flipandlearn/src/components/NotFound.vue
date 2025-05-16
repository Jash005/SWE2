<template>
  <div class="not-found">
    <h1>404 - Oops! Seite nicht gefunden</h1>
    <p>Es sieht so aus, als ob du dich verlaufen hast...</p>

    <div class="not-found-card" id="not-found-gif1" @click="countCardClick()">
      <video src="@/assets/404_GIF.mp4" autoplay loop muted playsinline ></video>
    </div>

    <div class="not-found-card" id="not-found-gif2" @click="countCardClick()">
      <video src="@/assets/404_GIF_WHY.mp4" autoplay loop muted playsinline ></video>
    </div>

    <div class="not-found-card" id="not-found-flip">
      <vue-flip active-click="true" width="200px" height="250px" @click="countCardClick()">
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
    data() {
    return {
      counter: 0
    };
  },
  mounted() {
    console.log('NotFound component mounted');
  },
  methods: {
    countCardClick() {
      const card = document.getElementById('not-found-flip');
      const gif1 = document.getElementById('not-found-gif1');
      const gif2 = document.getElementById('not-found-gif2');
      
      switch (this.counter) {
        case 5:
          gif1.style.display = 'block';
          gif2.style.display = 'none';
          card.style.display = 'none';
          this.counter++;
          break;
        case 10:
          gif1.style.display = 'none';
          gif2.style.display = 'block';
          card.style.display = 'none';
          this.counter++;
          break;
        case 15:
          gif1.style.display = 'none';
          gif2.style.display = 'none';
          card.style.display = 'block';
          this.counter++;
          break;
        default:
          this.counter++;
      }

      if (this.counter > 15) {
        this.counter = 0;
      }

    }
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

#not-found-gif1,
#not-found-gif2 {
  display: none;
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