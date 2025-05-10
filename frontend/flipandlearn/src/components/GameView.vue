<template>
  <div class="game-view">
    <h2>Spielen</h2>

    <article v-if="!selectedSet">
      <section class="set-area" v-if="allUserSets.length > 0">
        <SingleSetPlay v-for="set in allUserSets" :key="set.id" :set="set" @play="playSet" />
      </section>
    </article>

    <article v-else>
      <h3>{{ selectedSet.title }}</h3>

      <h4>Punkte: {{ gameScore }}</h4>
      <h4>Anzahl Züge: {{ moves }}</h4>

      <section class="match-buttons" :class="{ hidden: flippedCards.length !== 2 }">
        <MatchButtons @decision="handleUserDecision" />
      </section>

      <section class="card-area">
        <SingleCard v-for="card in selectedSet.cardPair.slice(0, 16)" :key="card.id" :card="card"
          :active-click="card.activeClick" v-bind:class="{ hidden: card.hidden }" @click="flipCard(card)" />
      </section>
    </article>
  </div> <!-- END .game-view -->
</template>

<script>
import SingleSetPlay from './SingleSetPlay.vue';
import SingleCard from './SingleCard.vue';
import MatchButtons from './MatchButtons.vue';
import api from '../plugins/axios.js';
import { useAuthStore } from '@/stores/auth-store.js';

export default {
  name: 'GameView',
  components: {
    SingleSetPlay,
    SingleCard,
    MatchButtons
  },
  async mounted() {
    const setId = this.$route.query.setId;
    const setTitle = this.$route.query.setTitle;

    if (setId) {
      try {
        const response = await api.get(`/sets/${setId}`);
        const fetchedSet = response.data;

        const shuffle = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        this.selectedSet = {
          id: setId,
          title: setTitle || fetchedSet.title,
          cardPair: shuffle(
            fetchedSet.cardPair.flatMap((pair, pairIndex) => [
              {
                id: pairIndex * 2,
                pairId: pair.pairId,
                type: 'question',
                content: pair.question,
                flipped: false,
                activeClick: true
              },
              {
                id: pairIndex * 2 + 1,
                pairId: pair.pairId,
                type: 'answer',
                content: pair.answer,
                flipped: false,
                activeClick: true
              }
            ])
          )
        };
      } catch (error) {
        this.errors.apiError = "Fehler beim Laden des ausgewählten Sets. Bitte versuchen Sie es erneut.";
        console.error('Error fetching set details:', error);
      }
    } else {
      try {
        const authStore = useAuthStore();
        const currentUsername = authStore.user.username;
        const response = await api.get(`/users/${currentUsername}/sets`);
        this.allUserSets = response.data;
      } catch (error) {
        this.errors.apiError = "Fehler beim Laden der Sets. Bitte versuchen Sie es erneut.";
        console.error('Error fetching sets:', error);
      }
    }
  },

  data() {
    return {
      selectedSet: null,
      allUserSets: [],
      flippedCards: [],
      errors: {
        apiError: null
      },
      gameScore: 0,
      moves: 0
    };
  },
  methods: {
    /* ----------- Logic for load selected Set -----------*/
    async playSet(set) {
      try {
        const response = await api.get(`/sets/${set._id}/random?numCards=8`);
        const fetchedSet = response.data;

        const shuffle = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        this.selectedSet = {
          id: fetchedSet._id,
          title: fetchedSet.title,
          cardPair: shuffle(
            fetchedSet.cardPair.flatMap((pair, pairIndex) => [
              {
                id: pairIndex * 2,
                pairId: pair.pairId,
                type: 'question',
                content: pair.question,
                flipped: false,
                activeClick: true
              },
              {
                id: pairIndex * 2 + 1,
                pairId: pair.pairId,
                type: 'answer',
                content: pair.answer,
                flipped: false,
                activeClick: true
              }
            ])
          )

        };
      } catch (error) {
        this.errors.apiError = "Fehler beim Laden des ausgewählten Sets. Bitte versuchen Sie es erneut.";
        console.error('Error fetching set details:', error);
      }
    },

    /* ----------- Memory game Logic -----------*/
    flipCard(card) {
      if (this.flippedCards.length >= 2 || !card.activeClick) {
        return;
      }
      card.flipped = true;
      card.activeClick = false;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.selectedSet.cardPair.forEach(c => (c.activeClick = false));
      }
    },
    handleUserDecision(isMatch) {
      if (this.flippedCards.length === 2) {
        this.moves += 1;
        const [card1, card2] = this.flippedCards;
        const isCorrectMatch = card1.pairId === card2.pairId && card1.type !== card2.type;

        if (isMatch === isCorrectMatch) {
          if (isCorrectMatch) {
            this.gameScore += 1;
            card1.hidden = true;
            card2.hidden = true;
          }
        } else {
          if (this.gameScore > 0) {
            this.gameScore -= 1;
          }
        }

        if (this.selectedSet.cardPair.every(card => card.hidden)) {
          this.finishGame();
        } else {
          this.resetFlippedCards();
        }
      }
    },
    resetFlippedCards() {
      setTimeout(() => {
        this.flippedCards.forEach(card => {
          card.activeClick = true;
          card.flipped = false;
        });
        this.flippedCards = [];
        this.selectedSet.cardPair.forEach(c => (c.activeClick = true));
      }, 100);
    },

    /* ----------- End of Memory game Logic -----------*/
    finishGame() {
      console.log('Spiel beendet!');

      this.$router.push({
        name: 'GameResult',
        query: { score: this.gameScore, moves: this.moves, setId: this.selectedSet.id, setTitle: this.selectedSet.title }
      });
    }
  }
};
</script>

<style scoped>
.game-view {
  text-align: center;
  padding: 20px;
}

h2 {
  color: var(--general-font-header);
  text-shadow: var(--font-header-shadow);
  margin-bottom: 20px;
}

h3 {
  color: var(--general-font);
  margin-bottom: 20px;
}

.set-area {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card-area {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  padding: 20px;
  justify-content: center;
}

.card-area>* {
  grid-column: span 1;
  grid-row: span 1;
  visibility: visible;
}

.card-area>.hidden {
  visibility: hidden;
}

.match-buttons {
  margin-bottom: 20px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.match-buttons.hidden {
  visibility: hidden;
}

@media (min-width: 768px) {
  .card-area {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
  }
}
</style>
