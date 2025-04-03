<template>
    <div class="single-card">
        <!-- TODO Front -->
        <div class="card-front">
            <div class="card-content">
                <!-- question mark vector grafic -->
                <h2>?</h2>
            </div>
        </div> <!-- END card-front -->

        <!-- TODO Back -->
        <div class="card-back">
            <div class="card-content">
                <h2>Test</h2>
                <h2>{{ card?.answer || "Keine Antwort" }}</h2>
            </div>
        </div> <!-- ENDE card-back -->
    </div> <!-- END card -->
</template>

<script>
export default {
    name: 'SingleCard',
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    mounted() {
        // console.log("Card Prop:", this.card);
    }
};
</script>

<style scoped>
.single-card {
  width: 120px;
  height: 160px;
  background-color: #1e1e1e;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--general-font);
  font-size: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  text-align: center;
}

.single-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
}
</style>
