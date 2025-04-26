import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './components/HomeView.vue';
import LoginView from './components/LoginView.vue';
import GameView from './components/GameView.vue';
import CardManagmentView from './components/CardManagmentView.vue';
import ProfilView from './components/ProfilView.vue';
import CardCreateView from './components/CardCreateView.vue';
import NotFound from './components/NotFound.vue';
import GameResult from './components/GameResult.vue';
// import { useAuthStore } from './stores/auth-store';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/game', name: 'Game', component: GameView },
  { path: '/card-management', name: 'CardManagement', component: CardManagmentView },
  { path: '/profil', name: 'Profil', component: ProfilView },
  { path: '/card-create', name: 'CardCreate', component: CardCreateView, 
    /* meta: { requiresAuth: true }, // This route requires the user to be logged in */
   },
  { path: '/game-result', name: 'GameResult', component: GameResult },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/*
// Route guard to check if user is logged in
  router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const authStore = useAuthStore();
      console.log('Checking authentication for route:', to.path);
      console.log('User logged in:', authStore.loggedIn);
      // If user is not logged in, redirect to login page
      if (!authStore.loggedIn && !localStorage.getItem('user')) {
        // TODO: Show notification to user about the need to log in
        next('/login');
      } else {
        next(); // Proceed to the requested route
      }
    } else {
      next(); // If the route does not require authentication, just proceed
    }
  });
 */ 

export default router;