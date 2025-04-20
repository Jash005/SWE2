<template>
  <div>
    <CardInputField @add-card="addNewCard" />

    <section v-if="set && set.cardPair && set.cardPair.length > 0">
      <h2>Vorhandene Karten:</h2>
      <div class="card-wrapper">
        <CardPairView v-for="card in set.cardPair" :key="card.id" :card="card" />
      </div>
    </section>
    <section v-else>
      <h2>Keine Karten vorhanden</h2>
    </section>
  </div>
</template>

<script>
import CardInputField from './CardInputField.vue';
import CardPairView from './CardPairView.vue';

export default {
  name: 'CardCreateView',
  components: {
    CardInputField,
    CardPairView
  },
  data() {
    return {
      index: 0,
      set: {
        id: null,
        title: "",
        cardPair: []
      },
    };
  },
  methods: {
    addNewCard(newCard) {
      this.set.cardPair.unshift({ id: this.index++, ...newCard });
    },
    addSet(){

    }
  }
};
</script>

<style scoped>
h1 {
  color: var(--general-font);
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  color: var(--general-font);
  text-align: center;
}

.card-wrapper {
  margin: auto;
  margin-top: 20px;
  max-width: 500px;
}

section {
  /* background-color: var(--general-font); */
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
  max-width: 1000px;
  margin: 40px auto;
}
</style>
