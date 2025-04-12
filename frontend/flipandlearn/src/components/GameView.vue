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

      <section class="match-buttons">
        <MatchButtons />
      </section>

      <section class="card-area">
        <SingleCard 
          v-for="card in transformCards(selectedSet.cardPair)" 
          :key="card.id" 
          :card="card" />
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
            { pairId: 0, question: 'Frage 0', answer: 'Antwort 0' },
            { pairId: 1, question: 'Frage 1', answer: 'Antwort 1' }
          ]
        }
      ]
    };
  },
  methods: {
    transformCards(cardPair) {
      // Wandelt die Paare in einzelne Karten um
      return cardPair.flatMap(pair => [
        { id: `${pair.pairId}-q`, type: 'question', content: pair.question, pairId: pair.pairId },
        { id: `${pair.pairId}-a`, type: 'answer', content: pair.answer, pairId: pair.pairId }
      ]);
    },
    selectSet(set) {
      this.selectedSet = set;
    },
    deleteSet(set) {
      console.log('Set gelöscht:', set);
      confirm('Möchten Sie das Set wirklich löschen?') ? this.allUserSets = this.allUserSets.filter(s => s.id !== set.id) : null;
    },
    playSet(set) {
      console.log('Set spielen:', set);
      this.selectedSet = set;
    },
    editSet(set) {
      console.log('Set bearbeiten:', set);
      this.$router.push({ path: '/card-create', query: { setId: set.id } });
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

@media (min-width: 768px) {
  .card-area {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
  }
}
</style>
