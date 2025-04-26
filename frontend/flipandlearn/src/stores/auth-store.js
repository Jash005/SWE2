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
    // Check if user is logged in
    isLoggedIn(state) {
      return state.user !== null;
    }
  },
  actions: {
    // Store user data in local storage
    // and set it in the state
    setUser(userData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    // Clear user data from local storage
    // and set it to null in the state
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
