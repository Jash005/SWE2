<template>
  <div class="card-container">
    <div class="card-wrapper">
      <textarea
        v-model="cardModel.question"
        :readonly="editCardPairId !== card.pairId"
        :class="{ 'error-card': errors?.question }"
        class="card"
      />
      <div v-if="errors?.question" class="error-message">
        {{ errors.question }}
      </div>
    </div>
    <div class="card-wrapper">
      <textarea
        v-model="cardModel.answer"
        :readonly="editCardPairId !== card.pairId"
        :class="{ 'error-card': errors?.answer }"
        class="card"
      />
      <div v-if="errors?.answer" class="error-message">{{ errors.answer }}</div>
    </div>

    <div class="action-wrapper">
      <span
        v-if="!editMode"
        @click="allowCardEdit"
        class="material-symbols-outlined"
      >
        edit
      </span>
      <span v-else @click="editCard" class="material-symbols-outlined">
        check
      </span>
      <span class="material-symbols-outlined" @click="deleteCard">
        delete
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPair",
  components: {},
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cardModel: { ...this.card },
      editMode: false,
      editCardPairId: "",
      errors: {
        question: "",
        answer: "",
      },
    };
  },
  methods: {
    allowCardEdit() {
      this.editMode = true;
      this.editCardPairId = this.cardModel.pairId;
      // Emit event to the parent component
      // to add the card to the shown existing/added cards deck
      /// this.$emit("edit-card", { pairId: this.cardModel.pairId });
    },
    editCard() {
      if (this.validateCard()) {
        this.editMode = false;
        this.editCardPairId = "";
        this.$emit("edit-card", {
          pairId: this.cardModel.pairId,
          ...this.cardModel,
        });
      } else {
        console.log("Error");
        //this.errors.formError = 'Bitte alle Felder ausfüllen.';
      }
    },
    deleteCard() {
      this.$emit("delete-card", this.card.pairId);
    },
    validateCard() {
      let isValid = true;
      // Allowed pattern for questions and answers
      const qaPattern = /^[\w\d\s\-_,.!?’()+%/&äöüÄÖÜß]{3,70}$/;

      // Reset errors
      this.errors = {};

      if (!this.cardModel.question.trim() || !this.cardModel.answer.trim()) {
        this.errors.missingFieldsError = "Frage und Antwort sind erforderlich.";
        isValid = false;
        return isValid;
      }

      // Validate question and answer
      const pairErrors = {};
      if (!qaPattern.test(this.cardModel.question)) {
        pairErrors.question =
          "Frage muss zwischen 3 und 70 Zeichen sein und nur erlaubte Sonderzeichen enthalten.";
        isValid = false;
      }
      if (!qaPattern.test(this.cardModel.answer)) {
        pairErrors.answer =
          "Antwort muss zwischen 3 und 70 Zeichen sein und nur erlaubte Sonderzeichen enthalten.";
        isValid = false;
      }
      this.errors = pairErrors;

      return isValid;
    },
  },
};
</script>

<style scoped>

.card-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 20px;
  max-width: 500px;
  width: 100%;
}
.card-wrapper {
  flex: 1 1 calc(39% - 0.5rem);
  display: flex;
  flex-direction: column;
}
.card {
  min-height: 100px;
  padding: 1rem;
  outline: 5px solid var(--general-font-header);
  outline-offset: -10px;
  background-color: var(--general-font-hover);
  color: var(--black-font);
  font-weight: 500;
  transition: box-shadow 0.2s ease;
  border: 1px solid var(--button);
}
.error-card {
  outline-color: var(--error-color);
  color: var(--error-color);
}
.error-card:hover {
  outline-color: var(--error-color);
}

.action-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  /* visibility: hidden; 
  opacity: 0; 
  transition: opacity 0.3s ease; */
}

/* .card-container:hover .action-wrapper {
  visibility: visible;
  opacity: 1;
} */

.material-symbols-outlined {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.material-symbols-outlined:hover {
  transform: scale(1.2);
}

/* Mobile-View */
@media (max-width: 767px) {
  .card-container {
    margin-top: 30px;
  }
  .card-wrapper {
    flex: 1 1 100%;
  }

  .action-wrapper {
    flex-direction: row;
    flex: 1 1 100%;
    justify-content: center;
    align-items: center;
  }
}

.error-message {
  color: red;
  margin-top: 10px;
  background: #ffe0e0;
  padding: 10px;
  min-height: 1.2em;
  text-align: left;
}
</style>
