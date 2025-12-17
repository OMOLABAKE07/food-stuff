import router from "../router";
import api from "./api";

export const Auth = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("authToken") || null,

  async login(email, password) {
    try {
      const res = await api.post("/login", { email, password });

      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("authToken", this.token);
      localStorage.setItem("user", JSON.stringify(this.user));

      if (this.user.role === "admin") {
        router.push({ name: "AdminDashboard" });
      } else {
        router.push({ name: "Home" });
      }

      return this.user;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  },

  async logout() {
    try {
      await api.post("/logout");
    } catch (error) {
      console.warn("Logout failed, clearing local state anyway");
    } finally {
      this.user = null;
      this.token = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      router.push({ name: "Login" });
    }
  },

  isLoggedIn() {
    return !!this.token;
  },
};
