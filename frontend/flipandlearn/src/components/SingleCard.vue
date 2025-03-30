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
div.single-card {
    background-color: beige;
}
</style>