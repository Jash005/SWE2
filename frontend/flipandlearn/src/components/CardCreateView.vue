<template>
  <div>
    <h1>Kartenverwaltung</h1>

    <CardInputField @add-card="addNewCard" />

    <section v-if="allExistingCards.length > 0">
      <h2>Vorhandene Karten:</h2>
      <div class="card-container">
        <SingleCard v-for="card in allExistingCards" :key="card.id" :card="card" />
      </div>
    </section>
    <section v-else>
      <h2>Keine Karten vorhanden</h2>
    </section>
  </div>
</template>

<script>
import SingleCard from './SingleCard.vue';
import CardInputField from './CardInputField.vue';

export default {
  name: 'CardCreateView',
  components: {
    SingleCard,
    CardInputField,
  },
  data() {
    return {
      allExistingCards: [
        { id: 2, question: 'Frage 2', answer: 'Antwort 2' },
        { id: 3, question: 'Frage 3', answer: 'Antwort 3' },
        { id: 4, question: 'Frage 4', answer: 'Antwort 4' },
        { id: 5, question: 'Frage 5', answer: 'Antwort 5' },
        { id: 6, question: 'Frage 6', answer: 'Antwort 6' },
        { id: 7, question: 'Frage 7', answer: 'Antwort 7' },
        { id: 8, question: 'Frage 8', answer: 'Antwort 8' },
        { id: 9, question: 'Frage 9', answer: 'Antwort 9' },
        { id: 10, question: 'Frage 10', answer: 'Antwort 10' },
      ] // backend data needs
    };
  },
  methods: {
    addNewCard(newCard) {
      this.allExistingCards.push({ id: Date.now(), ...newCard });
    }
  }
};
</script>