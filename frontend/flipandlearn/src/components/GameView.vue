<template>
  <div class="game-view">
    <h2>Spielen</h2>

    <article v-if="!selectedSet">
      <section class="set-area" v-if="allUserSets.length > 0">
        <SingleSetPlay v-for="set in allUserSets" :key="set.id" :set="set" @play="playSet" />
      </section>
    </article>

    <article v-else>
      <h3>{{ selectedSet.name }}</h3>

      <section class="match-buttons">
        <MatchButtons />
      </section>

      <section class="card-area">
        <SingleCard 
          v-for="card in selectedSet.cards.slice(0, 16)" 
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
        { id: 1, name: 'Set 1', cards: [{ id: 1, question: 'Frage 1', answer: 'Antwort 1' }] },
        {
          id: 2, name: 'Set 2', cards: [
            { id: 2, content: 'Antwort 2' },
            { id: 3, content: 'Antwort 3' },
            { id: 4, content: 'Antwort 4' },
            { id: 5, content: 'Antwort 5' },
            { id: 6, content: 'Antwort 6' },
            { id: 7, content: 'Antwort 7' },
            { id: 8, content: 'Antwort 8' },
            { id: 9, content: 'Antwort 9' },
            { id: 10, content: 'Antwort 10' }
          ]
        }
      ]
    };
  },
  methods: {
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
