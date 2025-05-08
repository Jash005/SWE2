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

      <section class="recent-games">
        <h4>Letzte Spiele</h4>
        <div class="recent-games-list">
          <div v-for="game in recentGames" :key="game.id" class="recent-game-item" @click="playSet(game)">
            <span class="game-name">{{ getSetTitle(game.setId) }}</span>
            <span class="game-score">{{ game.score }} Punkte</span>
          </div>
        </div>
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
      username: JSON.parse(localStorage.getItem("user")).username,
      allUserSets: [],
      recentGames: [],
    };
  },
  async mounted () {
    try {
      const token = btoa(`${this.username}:${JSON.parse(localStorage.getItem("user")).password}`);

      const response = await fetch(`http://localhost:3000/api/users/${this.username}/sets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Sets');
      }
      const data = await response.json();
      this.allUserSets = data;

      // Fetch recent games

      // API-Call: Scores abrufen
      const responseScores = await fetch(`http://localhost:3000/api/scores`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      });

      if (!responseScores.ok) {
        throw new Error("Fehler beim Abrufen der Scores");
      }

      const scores = await responseScores.json();
      console.log(scores);
      // Filtern: Nur Einträge, die zum aktuellen Benutzer passen
      const userScores = scores.filter((score) => score.username === this.username);
      console.log(userScores);
      // Sortieren: Absteigend nach `setId`
      // Macht keinn Sinn mehr, da random
      userScores.sort((a, b) => b.setId - a.setId);

      // Nur die höchsten x Einträge (default sind 3)
      const topX = 3; // Anzahl der gewünschten Einträge
      this.recentGames = userScores.slice(0, topX);

      console.log("Gefilterte und sortierte Scores:", JSON.stringify(this.recentGames));
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    deleteSet(set) {
      confirm('Möchten Sie das Set wirklich löschen?')
        ? (this.allUserSets = this.allUserSets.filter((s) => s.id !== set._id))
        : null;
    },
    playSet(set) {
      this.$router.push({ path: '/game', query: { setId: set._id } });
    },
    editSet(set) {
      this.$router.push({ path: '/card-create', query: { setId: set._id } });
    },
    async getSetTitle(setId) {
      try {
        const token = btoa(`${this.username}:${JSON.parse(localStorage.getItem("user")).password}`);

        const response = await fetch(`http://localhost:3000/api/sets/${setId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`,
          }
        });
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen des Sets');
        }
        const data = await response.json();
        console.log(data);
        console.log(data.title);
        return data.title;
      } catch (error) {
          console.error(error);
      }
    },
  },};
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

.card-area>div {
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


.recent-games {
  margin-top: 30px;
  text-align: center;
}

.recent-games-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.recent-game-item {
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding: 10px 15px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recent-game-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--card-shadow-hover);
}

.game-name {
  font-weight: 600;
  color: var(--general-font);
}

.game-score {
  font-weight: 500;
  color: var(--secondary-font);
}
</style>