<template>
  <div>
    <h2>{{ username }}</h2>

    <article>
      <h4>Meine Sets</h4>

      <section class="card-area" v-if="allUserSets || allUserSets != 0">
        <router-link to="/card-create" class="create-button">+ Set erstellen</router-link>
        <div>
          <SingleSet v-for="set in allUserSets" :key="set.id" :set="set" @delete="deleteSet" @play="playSet"
                     @edit="editSet" />
        </div>
      </section>

      <section class="card-area" v-else>
        <router-link to="/card-create" class="create-button">+ Set erstellen</router-link>
        <h1>no sets available</h1>
      </section>
    </article>
  </div>
</template>

<script>
import SingleSet from './SingleSet.vue';

export default {
  name: 'ProfilView',
  components: {
    SingleSet,
  },
  data() {
    return {
      username: 'Test User',
      allUserSets: [
        { id: 1, name: 'Set 1', cards: [{ id: 1, question: 'Frage 1', answer: 'Antwort 1' }] },
        {
          id: 2, name: 'Set 2', cards: [
            { id: 2, question: 'Frage 2', answer: 'Antwort 2' },
            { id: 3, question: 'Frage 3', answer: 'Antwort 3' }
          ]
        }
      ],
    };
  },
  methods: {
    deleteSet(set) {
      confirm('Möchten Sie das Set wirklich löschen?') ? this.allUserSets = this.allUserSets.filter(s => s.id !== set.id) : null;
    },
    playSet(set) {
      this.$router.push({ path: '/game', query: { setId: set.id } });
    },
    editSet(set) {
      this.$router.push({path: '/card-create', query: {setId: set.id}});
    }
  }
};
</script>

<style scoped>
h2 {
  color: var(--general-font-header);
  text-shadow: var(--font-header-shadow);
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

h4 {
  color: var(--general-font);
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
}

.card-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.card-area > div {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.create-button {
  background-color: var(--button);
  color: var(--button-font);
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: var(--button-shadow);
}

.create-button:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
}
</style>
