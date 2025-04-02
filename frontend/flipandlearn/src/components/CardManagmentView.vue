<template>

    <!-- show all Sets -->
    <section class="card-area" v-if="allUserSets.length > 0">
        <SingleSet v-for="set in allUserSets" :key="set.id" :set="set" @delete="deleteSet" @play="playSet"
            @edit="editSet" />
        <router-link to="/card-create">+ Set erstellen</router-link>
    </section> <!-- END card-area -->

    <section class="card-area" v-else>
        <h1>Keine Sets verfügbar</h1>
        <router-link to="/card-create">+ Set erstellen</router-link>
    </section> <!-- END card-area -->
</template>

<script>
import SingleSet from './SingleSet.vue';

export default {
    name: 'CardManagmentView',
    components: {
        SingleSet,
    },
    data() {
        return {
            allUserSets: [
                { id: 1, name: 'Set 1' },
                { id: 2, name: 'Set 2' }
            ], // backend data needs
        };
    },
    methods: {
        deleteSet(set) {
            console.log('Set gelöscht:', set);
            confirm('Möchten Sie das Set wirklich löschen?') ? this.allUserSets = this.allUserSets.filter(s => s.id !== set.id) : null;
        },
        playSet(set) {
            console.log('Set spielen:', set);
            this.$router.push({
                path: '/game',
                query: { setId: set.id }
            });
        },
        editSet(set) {
            console.log('Set bearbeiten:', set);
            this.$router.push({ path: '/card-create', query: { setId: set.id } });
        }
    }
};
</script>

<style scoped>
.card-area {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.card-area h1 {
  color: var(--white-font);
}

a {
  color: var(--bright-font);
  text-decoration: none;
  margin-top: 10px;
}

a:hover {
  color: var(--bright-font);
}
</style>
