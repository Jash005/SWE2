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

      <section class="match-buttons" v-if="flippedCards.length === 2">
        <MatchButtons @decision="handleUserDecision" />
      </section>

      <section class="card-area">
        <SingleCard 
          v-for="card in selectedSet.cardPair" 
          :key="card.id" 
          :card="card" 
          :active-click="card.activeClick"
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
            { id: 3, pairId: 1, type: 'answer', content: 'Antwort 1', flipped: false, activeClick: true }
          ]
        }
      ],
      flippedCards: []
    };
  },
  methods: {
    playSet(set) {
      this.selectedSet = set;
    },
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
            this.selectedSet.cardPair = this.selectedSet.cardPair.filter(
              card => card.id !== card1.id && card.id !== card2.id
            );
          }
        }
        this.resetFlippedCards();
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

@media (min-width: 768px) {
  .card-area {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
  }
}
</style>
