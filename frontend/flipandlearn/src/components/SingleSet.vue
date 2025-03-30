<template>
  <!-- TODO SingleSet -->
  <div class="single-set">
    <h3>{{ set?.name || 'Set ohne Name' }}</h3>
    <!-- TODO replace with Icons -->
    <p @click.stop="deleteSet">löschen</p>
    <p @click.stop="playSet">spielen</p>
    <p @click.stop="editSet">bearbeiten</p>
  </div>
</template>

<script>
export default {
  name: 'SingleSet',
  props: {
    set: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteSet() {
      this.$emit('delete', this.set);
    },
    playSet() {
      this.$emit('play', this.set);
    },
    editSet() {
      this.$emit('edit', this.set);
    }
  }
};
</script>

<style scoped>
div.single-set {
  background-color: aqua;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}

.icon:hover path {
  stroke: #333;
}

.icon {
  cursor: pointer;
}
</style>