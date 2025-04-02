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
  padding: 10px;
  width: 300px;
  background-color: var(--color-input-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--white-font);
}

input:focus {
  border-color: var(--bright-font);
  background-color: #1a1a1a;
}

button {
  padding: 10px 20px;
  background-color: var(--bright-font);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: var(--bright-font-hover);
  transform: translateY(-2px);
}
</style>
