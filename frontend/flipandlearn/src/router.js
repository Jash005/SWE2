import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView.vue";
import LoginView from "./components/LoginView.vue";
import GameView from "./components/GameView.vue";
import CardManagmentView from "./components/CardManagmentView.vue";
import ProfilView from "./components/ProfilView.vue";
import CardCreateView from "./components/CardCreateView.vue";
import GameResult from "./components/GameResult.vue";
import NotFound from "./components/NotFound.vue";
import { useAuthStore } from "./stores/auth-store";

const routes = [
  { 
    path: "/", 
    name: "Home", 
    component: HomeView,
    meta: { requiresAuth: false }, // This route does not require authentication 
  },
  { 
    path: "/login", 
    name: "Login", 
    component: LoginView,
    meta: { requiresAuth: false }
  },
  { 
    path: "/game", 
    name: "Game", 
    component: GameView,
    meta: { requiresAuth: true }, // This route requires the user to be logged in
  },
  {
    path: "/card-management",
    name: "CardManagement",
    component: CardManagmentView,
    meta: { requiresAuth: true },
  },
  { 
    path: "/profil", 
    name: "Profil", 
    component: ProfilView, 
    meta: { requiresAuth: true },
  },
  { 
    path: "/card-create", 
    name: "CardCreate", 
    component: CardCreateView,
    meta: { requiresAuth: true },
  },
  { 
    path: "/game-result", 
    name: "GameResult", 
    component: GameResult,
    meta: { requiresAuth: true }
  },
  { 
    path: "/:pathMatch(.*)*", 
    name: "NotFound", 
    component: NotFound,
    meta: { requiresAuth: false }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// Route guard to check if user is logged in
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
      
      // If user is not logged in, redirect to login page
      if (!authStore.loggedIn && !localStorage.getItem('user')) {

        // TODO: Show notification to user about the need to log in
        next('/login');
      } 
      else {
        next(); // Proceed to the requested route
      }
    } 
    else {
      next(); // If the route does not require authentication, just proceed
    }
  });
 

export default router;
