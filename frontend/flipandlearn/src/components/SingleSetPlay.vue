<template>
  <div class="single-set-play" @click.stop="playSet">
    <h3>{{ set?.title || 'Set ohne Name' }}</h3>
  </div>
</template>

<script>
export default {
  name: 'SingleSetPlay',
  props: {
    set: {
      type: Object,
      required: true
    }
  },
  methods: {
    playSet() {
      this.$emit('play', this.set);
    }
  }
};
</script>

<style scoped>
.single-set-play {
  background-color: var(--box);
  padding: 24px;
  margin: 16px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  text-align: center;
  min-width: 160px;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.single-set-play:hover {
  transform: translateY(-3px);
}

.single-set-play h3 {
  color: var(--general-font);
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
}
</style>
