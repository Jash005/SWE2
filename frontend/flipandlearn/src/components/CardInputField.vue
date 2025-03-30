<template>
  <div>
    <h2>Neue Karte hinzufügen</h2>
    <form @submit.prevent="submitCard">
      <input v-model="question" placeholder="Frage eingeben" required />
      <input v-model="answer" placeholder="Antwort eingeben" required />
      <button type="submit">Hinzufügen</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CardInputField",
  data() {
    return {
      question: "",
      answer: ""
    };
  },
  methods: {
    submitCard() {
      if (!this.question || !this.answer) return;
      this.$emit("add-card", { question: this.question, answer: this.answer });
      this.question = "";
      this.answer = "";
    }
  }
};
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}

button {
  padding: 5px 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>