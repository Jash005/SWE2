<template>
  <div>
    <CardInputField
      :set="set"
      @update-title="onUpdateTitle"
      @add-card="onAddNewCard"
      @create-set="onCreateSet"
    />

    <div v-if="errors.formError" class="error-message">
      {{ errors.formError }}
    </div>
    <div v-if="success.creationSuccess" class="success-message">
      {{ success.creationSuccess }}
    </div>

    <section v-if="set && set.cardPair && set.cardPair.length > 0">
      <h1>{{ set.title }}</h1>
      <h2>Vorhandene Karten</h2>
      <div class="card-wrapper">
        <CardPairView
          v-for="card in set.cardPair"
          :key="card.pairId"
          :card="card"
          @edit-card="onEditCard"
          @delete-card="onDeleteCard"
        />
      </div>
    </section>
    <section v-else>
      <h2>Keine Karten vorhanden</h2>
    </section>
  </div>
</template>

<script>
import CardInputField from "./CardInputField.vue";
import CardPairView from "./CardPairView.vue";
import api from "../plugins/axios.js";

export default {
  name: "CardCreateView",
  components: {
    CardInputField,
    CardPairView,
  },
  data() {
    return {
      index: 0,
      set: {
        id: null,
        title: "",
        cardPair: [],
      },
      // Error messages for validation
      errors: {
        formError: "",
      },
      success: {
        creationSuccess: "",
      },
    };
  },
  methods: {
    onUpdateTitle(newTitle) {
      this.set.title = newTitle;
    },
    onAddNewCard(newCard) {
      this.set.cardPair.unshift({ pairId: this.index++, ...newCard });
    },
    async onCreateSet(newSet) {
      console.log(newSet);
      // TODO: Add login data from storage
      const username = "aaaa";
      const password = "aaaa123!";
      const token = btoa(`${username}:${password}`);
      try {
        const response = await api.post("/sets", newSet, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        
        // TODO: Show success message to user maybe with a notification
        this.success.creationSuccess =
          "Set erfolgreich erstellt.";
        console.log("Set successfully saved:", response.data);

        // TODO: check if needed
        // Reset set model
        this.set = {
          id: null,
          title: "",
          cardPair: [],
        };
      } catch (error) {
        console.error("Error saving set:", error);
        // Show error message to user
        this.errors.formError =
          "Fehler beim Speichern des Sets. Bitte versuchen Sie es erneut.";
      }
    },
    onEditCard(editedCardPair) {
      const index = this.set.cardPair.findIndex(
        (card) => card.pairId === editedCardPair.pairId
      );

      if (index > -1) {
        this.set.cardPair[index].question = editedCardPair.question;
        this.set.cardPair[index].answer = editedCardPair.answer;
      } else {
        // TODO: Show error message
        console.log("Error: Card not found.");
      }
    },
    onDeleteCard(cardPairId) {
      const index = this.set.cardPair.findIndex(
        (card) => card.pairId === cardPairId
      );
      if (index > -1) {
        this.set.cardPair.splice(index, 1);
      } else {
        // TODO: Show error message
        console.log("Error: Card not found.");
      }
    },
  },
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

.error-message {
  color: red;
  background: #ffe0e0;
  padding: 10px;
  min-height: 1.2em;
  text-align: left;
  max-width: 500px;
  margin: auto;
}
.success-message {
  color: green;
  background: rgb(179, 255, 179);
  padding: 10px;
  min-height: 1.2em;
  text-align: left;
  max-width: 500px;
  margin: auto;
}
</style>
