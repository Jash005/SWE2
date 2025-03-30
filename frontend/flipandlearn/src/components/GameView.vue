<template>
  gameView works
  <div>
    <article v-if="!selectedSet">
      <section class="set-area" v-if="allUserSets.length > 0">
        <SingleSet v-for="set in allUserSets" :key="set.id" :set="set" @delete="deleteSet" @play="playSet"
          @edit="editSet" />
      </section>
    </article>

    <article v-else>
      <h2>{{ selectedSet.name }}</h2>
      <section class="card-area">
        <SingleCard v-for="card in selectedSet.cards.slice(0, 16)" :key="card.id" :card="card" />
      </section>
    </article>
  </div>
</template>

<script>
import SingleSet from './SingleSet.vue';
import SingleCard from './SingleCard.vue';

export default {
  name: 'GameView',
  components: {
    SingleSet,
    SingleCard
  },
  data() {
    return {
      selectedSet: null,
      allUserSets: [
        { id: 1, name: 'Set 1', cards: [{ id: 1, question: 'Frage 1', answer: 'Antwort 1' }] },
        {
          id: 2, name: 'Set 2', cards: [
            { id: 2, question: 'Frage 2', answer: 'Antwort 2' },
            { id: 3, question: 'Frage 3', answer: 'Antwort 3' },
            { id: 4, question: 'Frage 4', answer: 'Antwort 4' },
            { id: 5, question: 'Frage 5', answer: 'Antwort 5' },
            { id: 6, question: 'Frage 6', answer: 'Antwort 6' },
            { id: 7, question: 'Frage 7', answer: 'Antwort 7' },
            { id: 8, question: 'Frage 8', answer: 'Antwort 8' },
            { id: 9, question: 'Frage 9', answer: 'Antwort 9' },
            { id: 10, question: 'Frage 10', answer: 'Antwort 10' },
            { id: 11, question: 'Frage 11', answer: 'Antwort 11' },
            { id: 12, question: 'Frage 12', answer: 'Antwort 12' },
            { id: 13, question: 'Frage 13', answer: 'Antwort 13' },
            { id: 14, question: 'Frage 14', answer: 'Antwort 14' },
            { id: 15, question: 'Frage 15', answer: 'Antwort 15' },
            { id: 16, question: 'Frage 16', answer: 'Antwort 16' },
            { id: 17, question: 'Frage 17', answer: 'Antwort 17' },
            { id: 18, question: 'Frage 18', answer: 'Antwort 18' },
            { id: 19, question: 'Frage 19', answer: 'Antwort 19' },
            { id: 20, question: 'Frage 20', answer: 'Antwort 20' }
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
.card-area {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>