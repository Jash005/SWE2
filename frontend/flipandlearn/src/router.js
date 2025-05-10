import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView.vue";
import LoginView from "./components/LoginView.vue";
import GameView from "./components/GameView.vue";
import CardManagmentView from "./components/CardManagmentView.vue";
import ProfilView from "./components/ProfilView.vue";
import CardCreateView from "./components/CardCreateView.vue";
import GameResult from "./components/GameResult.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/game", name: "Game", component: GameView },
  {
    path: "/card-management",
    name: "CardManagement",
    component: CardManagmentView,
  },
  { path: "/profil", name: "Profil", component: ProfilView },
  { path: "/card-create", name: "CardCreate", component: CardCreateView },
  { path: "/game-result", name: "GameResult", component: GameResult },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
