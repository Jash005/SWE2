<template>
  <div>
    <form @submit.prevent="addSet">
      <input v-model="setModel.title" class="h2-input" placeholder="Titel..." required @blur="updateTitle" />
      <div v-if="errors.title" class="error-message">{{ errors.title }}</div>

      <div class="card-input-container">
        <div class="card-input-wrapper">
          <textarea v-model="currentQuestion" :class="{ 'error-card': errors.cardPair?.question }" class="card-input"
            placeholder="Frage eingeben" />
          <div v-if="errors.cardPair?.question" class="error-message">
            {{ errors.cardPair.question }}
          </div>
        </div> <!-- END .card-input-wrapper -->

        <div class="card-input-wrapper">
          <textarea v-model="currentAnswer" :class="{ 'error-card': errors.cardPair?.answer }" class="card-input"
            placeholder="Antwort eingeben" />
          <div v-if="errors.cardPair?.answer" class="error-message">
            {{ errors.cardPair.answer }}
          </div>
        </div> <!-- END .card-input-wrapper -->
      </div> <!-- END .card-input-container -->
      <div v-if="errors.cardPair.lengthError" class="error-message">
        {{ errors.cardPair.lengthError }}
      </div>
      <div v-if="errors.cardPair.missingFieldsError" class="error-message">
        {{ errors.cardPair.missingFieldsError }}
      </div>

      <div class="button-wrapper">
        <button type="button" class="card-btn" @click="submitCard">
          Erstellen
        </button>
        <button type="submit" class="create-set-btn">{{ set._id ? "Speichern" : "Fertig" }}</button>
      </div> <!-- END .button-wrapper -->
    </form>
  </div>
</template>

<script>
export default {
  name: "CardInputField",
  props: {
    set: {
      type: Object,
      required: true,
    },
  },
  watch: {
    set: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal._id) {
          this.setModel = { ...newVal };
        }
      }
    }
  },
  data() {
    return {
      index: 0,
      setModel: { ...this.set },
      currentQuestion: "",
      currentAnswer: "",
      errors: {
        title: "",
        cardPair: [],
      }
    };
  },
  methods: {
    updateTitle() {
      if (!this.setModel.title.trim()) return;

      if (this.validateTitle()) {
        this.$emit("update-title", this.setModel.title);
      }
    },
    submitCard() {
      if (this.validateCardPair()) {
        this.$emit("add-card", {
          question: this.currentQuestion,
          answer: this.currentAnswer,
        });
        this.currentQuestion = "";
        this.currentAnswer = "";
      } else {
        console.log("Question or answer invalid:", this.errors);
      }
    },
    async addSet() {
      if (this.currentQuestion.trim() || this.currentAnswer.trim()) {
        // Add card to setModel if question or answer is not empty
        this.submitCard();
      }
      if (this.validateSet()) {
        this.$emit("create-set", this.setModel);
        this.setModel = {
          _id: null,
          title: "",
          cardPair: [],
        };
      } else {
        console.log("Form invalid:", this.errors);
      }
    },
    /* ----------- Validation Functions -----------*/
    validateCardPair() {
      let isValid = true;
      const qaPattern = /^[\w\d\s\-_,.!?’()+%/&äöüÄÖÜß]{3,70}$/;

      this.errors.cardPair = [];

      if (!this.currentQuestion.trim() || !this.currentAnswer.trim()) {
        this.errors.cardPair.missingFieldsError =
          "Frage und Antwort sind erforderlich.";
        isValid = false;
        return isValid;
      }

      const pairErrors = {};
      if (!qaPattern.test(this.currentQuestion)) {
        pairErrors.question =
          "Frage muss zwischen 3 und 70 Zeichen sein und nur erlaubte Sonderzeichen enthalten.";
        isValid = false;
      }
      if (!qaPattern.test(this.currentAnswer)) {
        pairErrors.answer =
          "Antwort muss zwischen 3 und 70 Zeichen sein und nur erlaubte Sonderzeichen enthalten.";
        isValid = false;
      }
      this.errors.cardPair = pairErrors;

      return isValid;
    },
    validateSet() {
      let isValid = true;

      this.errors.title = "";
      this.errors.cardPair = [];

      isValid = this.validateTitle();

      if (this.setModel.cardPair.length < 2) {
        this.errors.cardPair.lengthError =
          "Mindestens zwei Kartenpaare sind erforderlich.";
        isValid = false;
      } else {
        delete this.errors.cardPair.lengthError;
      }

      return isValid;
    },
    validateTitle() {
      let isValid = true;

      const allowedPattern = /^[\w\d\s\-_,.!?’()+/&äöüÄÖÜß]{3,100}$/;

      this.errors.title = "";

      if (!allowedPattern.test(this.setModel.title)) {
        this.errors.title =
          "Titel muss zwischen 3 und 100 Zeichen sein und nur erlaubte Sonderzeichen enthalten.";
        isValid = false;
      }

      return isValid;
    },
  },
};
</script>

<style scoped>
h2 {
  color: var(--general-font-header);
  text-shadow: var(--font-header-shadow);
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: block;
  max-width: 500px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 50px;
}

textarea {
  padding: 12px;
  font-size: 15px;
  resize: vertical;
}

.h2-input {
  all: unset;
  font-size: 2.2em;
  font-weight: bold;
  line-height: 1.2;
  color: var(--general-font-header);
  text-shadow: var(--font-header-shadow);
  display: block;
  max-width: 100%;
}

::v-deep(.h2-input::placeholder) {
  color: var(--general-font-header);
  opacity: 0.9;
  text-shadow: var(--font-header-shadow);
}

.card-input-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 1.6rem;
  margin-top: 20px;
  align-items: flex-start;
}

.card-input-wrapper {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
}

.card-input {
  min-height: 100px;
  padding: 1rem;
  outline: 5px solid var(--background);
  background-color: var(--input-card-background);
  color: var(--navbar-font);
  font-weight: 500;
  outline-offset: -10px;
  transition: box-shadow 0.2s ease;
  border: 1px solid var(--button);
}

.card-input:hover {
  outline: 5px solid var(--background);
}

::v-deep(.card-input::placeholder) {
  color: var(--navbar-font);
  opacity: 0.9;
}

.error-card {
  outline-color: var(--error-color);
  color: var(--error-color);
}

.error-card:hover {
  outline-color: var(--error-color);
}

.error-message {
  color: var(--error-color);
  margin-top: 10px;
  background: #ffe0e0;
  padding: 10px;
  min-height: 1.2em;
  text-align: left;
}

.button-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

button {
  background-color: var(--button);
  color: var(--button-font);
  padding: 12px;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  font-size: 16px;
  font-weight: 500;
}

button:hover {
  background-color: var(--general-font-hover);
  transform: translateY(-2px);
}

.card-btn {
  width: 70%;
}

.create-set-btn {
  width: 30%;
}
</style>
