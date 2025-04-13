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

      <section 
        class="match-buttons" 
        :class="{ hidden: flippedCards.length !== 2 }"
      >
        <MatchButtons @decision="handleUserDecision" />
      </section>

      <section class="card-area">
        <SingleCard 
          v-for="card in selectedSet.cardPair" 
          :key="card.id" 
          :card="card" 
          :active-click="card.activeClick"
          v-bind:class="{ hidden: card.hidden }"
          @click="flipCard(card)" />
      </section>
    </article>
  </div>
</template>

<script>
import SingleSetPlay from './SingleSetPlay.vue';
import SingleCard from './SingleCard.vue';
import MatchButtons from './MatchButtons.vue';

export default {
  name: 'GameView',
  components: {
    SingleSetPlay,
    SingleCard,
    MatchButtons
  },
  data() {
    return {
      selectedSet: null,
      allUserSets: [
        {
          id: 0,
          title: 'Titel für das Set',
          cardPair: [
            { id: 0, pairId: 0, type: 'question', content: 'Frage 0', flipped: false, activeClick: true },
            { id: 1, pairId: 0, type: 'answer', content: 'Antwort 0', flipped: false, activeClick: true },
            { id: 2, pairId: 1, type: 'question', content: 'Frage 1', flipped: false, activeClick: true },
            { id: 3, pairId: 1, type: 'answer', content: 'Antwort 1', flipped: false, activeClick: true },
            { id: 4, pairId: 2, type: 'question', content: 'Frage 2', flipped: false, activeClick: true },
            { id: 5, pairId: 2, type: 'answer', content: 'Antwort 2', flipped: false, activeClick: true },
            { id: 6, pairId: 3, type: 'question', content: 'Frage 3', flipped: false, activeClick: true },
            { id: 7, pairId: 3, type: 'answer', content: 'Antwort 3', flipped: false, activeClick: true },
            { id: 8, pairId: 4, type: 'question', content: 'Frage 4', flipped: false, activeClick: true },
            { id: 9, pairId: 4, type: 'answer', content: 'Antwort 4', flipped: false, activeClick: true }
          ]
        }
      ],
      flippedCards: []
    };
  },
  methods: {

    //--- set logic --//
    playSet(set) {
      this.selectedSet = set;
    },

    //--- memory game logic --//
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
        const [card1, card2] = this.flippedCards;
        const isCorrectMatch = card1.pairId === card2.pairId && card1.type !== card2.type;

        if (isMatch === isCorrectMatch) {
          if (isCorrectMatch) {
            console.log('Richtiges Paar gefunden:', card1, card2);
            card1.hidden = true;
            card2.hidden = true;
          }
        }

        if (this.selectedSet.cardPair.every(card => card.hidden)) {
          console.log('Alle Paare gefunden!');
          this.selectedSet = null;
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

    finishGame() {
      console.log('Spiel beendet!');
      this.selectedSet = null;
      this.flippedCards = [];

      this.$router.push({ name: 'GameResult' });
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

.card-area > * {
  grid-column: span 1; /* Jede Karte nimmt genau eine Spalte ein */
  grid-row: span 1;    /* Jede Karte nimmt genau eine Zeile ein */
  visibility: visible; /* Standardmäßig sichtbar */
}

.card-area > .hidden {
  visibility: hidden; /* Karten, die entfernt werden, bleiben unsichtbar */
}

.match-buttons {
  margin-bottom: 20px; /* Abstand nach unten */
  height: 50px; /* Feste Höhe, um Platz zu reservieren */
  display: flex;
  justify-content: center;
  align-items: center;
}

.match-buttons.hidden {
  visibility: hidden; /* Unsichtbar, aber Platz bleibt reserviert */
}

@media (min-width: 768px) {
  .card-area {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
  }
}
</style>
