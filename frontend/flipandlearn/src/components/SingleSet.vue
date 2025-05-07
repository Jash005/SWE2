<template>
  <!-- TODO SingleSet -->
  <div class="single-set">
    <h3>{{ set?.title || 'Set ohne Name' }}</h3>
    <!-- TODO replace with Icons -->
    <p @click.stop="playSet">spielen</p>
    <p @click.stop="editSet">bearbeiten</p>
    <p @click.stop="deleteSet">löschen</p>
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
  background-color: var(--box);
  padding: 24px;
  margin: 16px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  text-align: center;
  min-width: 160px;
  transition: transform 0.2s ease;
}

div.single-set:hover {
  transform: translateY(-3px);
}

.single-set h3 {
  color: var(--general-font-header);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.single-set p {
  color: var(--general-font);
  margin: 6px 0;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease;
}

.single-set p:hover {
  color: var(--general-font-hover);
}
</style>
