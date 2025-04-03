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
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

input {
  padding: 12px;
  background-color: var(--input-field);
  border: 1px solid var(--input-field-border);
  border-radius: 10px;
  color: var(--black-font);
  font-size: 15px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input:focus {
  background-color: var(--input-field-focus);
  color: var(--black-font);
  border-color: var(--general-font);
  outline: none;
}

button {
  background-color: var(--buttons);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 16px;
  font-weight: 500;
}

button:hover {
  background-color: var(--general-font-hover);
  transform: translateY(-2px);
}
</style>
