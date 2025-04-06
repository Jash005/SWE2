<template>
    <div class="single-card">
        <vue-flip v-model="modelCard" :active-click="true" :active-hover="false" :flip-time="0.5" width="100%"
            height="100%">
            <!-- This line is required because the library expects the attribute on the template tag -->
            <!-- eslint-disable-next-line vue/no-useless-template-attributes -->
            <template v-slot:front class="front">
                <span class="material-symbols-outlined">question_mark</span>
            </template>

            <!-- This line is required because the library expects the attribute on the template tag -->
            <!-- eslint-disable-next-line vue/no-useless-template-attributes -->
            <template v-slot:back class="back">
                <span class="text-back">back - Solution das ist eine längere antwort schon lang genug?</span>
            </template>
        </vue-flip>
    </div>
</template>

<script>
import { VueFlip } from 'vue-flip';

//TODO logic for memory functionality (flip two cards and check if they are the same)
export default {
    name: 'SingleCard',
    components: {
        'vue-flip': VueFlip
    },
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleClick() {
            this.modelCard = true;
        }
    }
};
</script>

<style scoped>
.single-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    aspect-ratio: 4 / 3;
    text-align: center;
    border-radius: 12px;
    color: var(--general-font);
    font-size: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.single-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
}

.material-symbols-outlined {
    font-size: 80px;
    color: var(--black-font);
}

@media screen and (min-width: 768px) {
    .single-card {
        font-size: 14px;
    }
}
</style>

<!-- global style for vue-flip component -->
<style>
.front,
.back {
    align-content: space-evenly;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 12px;
}

.front {
    background-color: var(--general-font-header);
    color: var(--black-font);
    text-shadow: var(--font-header-shadow);
}

.back {
    outline: 5px solid var(--general-font-header);
    outline-offset: -10px;
    background-color: var(--general-font-hover);
    color: var(--black-font);
    font-weight: 500;
}

.text-back {
    padding: 10px;
}
</style>
