<template>
    <div class="not-found">
      <h1>404 - Oops! Seite nicht gefunden</h1>
      <p>Es sieht so aus, als ob du dich verlaufen hast...</p>

        <span class="single-card">
            <SingleCard />
        </span>

      <router-link to="/" class="home-link">Zurück zur Startseite</router-link>
    </div>
  </template>
  
  <script>
    import SingleCard from './SingleCard.vue';

  export default {
    name: 'NotFound',
    components: {
      SingleCard,
    },
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 50px;
    font-family: 'Arial', sans-serif;
  }
  
  .not-found h1 {
    font-size: 48px;
    color: var(--general-font-header);
    margin-bottom: 20px;
  }
  
  .not-found p {
    font-size: 18px;
    color: var(--general-font);
    margin-bottom: 30px;
  }
  
  .not-found img {
    max-width: 300px;
    margin-bottom: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .single-card {
    width: 300px;
    height: auto;
    margin: 15px auto;
  }
  
  .home-link {
    display: inline-block;
    padding: 12px 24px;
    background-color: var(--button);
    color: var(--button-font);
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .home-link:hover {
    background-color: var(--general-font-hover);
    transform: translateY(-3px);
  }
  </style>