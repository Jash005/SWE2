<template>
  <div>
    <CardInputField
      v-if="set"
      :set="set"
      @update-title="onUpdateTitle"
      @add-card="onAddNewCard"
      @create-set="onCreateOrEditSet"
    />

    <div v-if="errors.formError" class="error-message">
      {{ errors.formError }}
    </div>
    <div v-if="errors.apiError" class="error-message">
      {{ errors.apiError }}
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
import { useAuthStore } from "../stores/auth-store.js";

export default {
  name: "CardCreateView",
  components: {
    CardInputField,
    CardPairView,
  },
  async mounted() { 
    const id = this.$route.query.setId
    if(id) {
      this.editingSet = true    // Set is being edited

      // Fetch the set data from the API
      try {
        const response = await api.get(`sets/${id}`)
        const item = response.data;

        if(item) {
          // Set the set model with the fetched data
          this.set = { ...item }
        }
      } catch (error) {
        this.editingSet = false;
        // TODO: Show error message to user
        this.errors.apiError =
          "Fehler beim Laden des Sets. Bitte versuchen Sie es erneut.";
        console.error('Error fetching item:', error)
      }
    }
  },
  data() {
    return {
      index: 0,
      set: {
        _id: null,
        title: "",
        cardPair: [],
      },
      editingSet: false,
      // Error messages for validation
      errors: {
        formError: "",
        apiError: "",
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
    async onCreateOrEditSet(newSet) {
      
      // Add login data from store
      const authStore = useAuthStore();
      const token = btoa(`${authStore.user.username}:${authStore.user.password}`);

      let response;
      try {
        if(this.editingSet) {
          // Update existing set
          response = await api.patch(`/sets/${this.set._id}`, newSet, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
        }
        else {
          // Create new set
          response = await api.post("/sets", newSet, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        }

        // Check if the response is successful
        // 200 for update, 201 for create
        const status = this.editingSet ? 200 : 201;
        
        if(response.status == status) {
          // TODO: Show success message to user maybe with a notification
          this.success.creationSuccess =
           "Set erfolgreich " + (this.editingSet ? "aktualisiert" : "erstellt") + ".";
          console.log("Set successfully saved:", response.data);
          
          this.editingSet = false;
          
          // Reset set model
          this.set = {
            _id: null,
            title: "",
            cardPair: [],
          };
        }
        else {
          this.errors.apiError =
            "Fehler beim Speichern des Sets. Bitte versuchen Sie es erneut.";
        }      
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
