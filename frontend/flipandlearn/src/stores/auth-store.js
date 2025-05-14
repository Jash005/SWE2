import { defineStore } from "pinia";

/**
 * Usage Example:
 *
 * import { useAuthStore } from '@/stores/user'
 *
 * const authStore = useAuthStore()
 *
 * // To log out the user:
 * authStore.logout()
 *
 * // To access user details:
 * console.log(authStore.username)       // Username as string
 * console.log(authStore.displayName)    // Display name as string
 *
 * // To check if the user is logged in
 * console.log(authStore.isLoggedIn)     // true or false
 */

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  getters: {
    isLoggedIn(state) {
      return state.user !== null;
    }
  },
  actions: {
    setUser(userData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
