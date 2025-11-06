<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">StudentMS</router-link>

      <ul class="navbar-nav ms-auto">
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>

        <li class="nav-item dropdown" v-if="isLoggedIn">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
          >
            Welcome, {{ user?.name || "User" }}
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><router-link class="dropdown-item" to="/courses">My Courses</router-link></li>
            <li><button class="dropdown-item text-danger" @click="logoutUser">Logout</button></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "MainNavbar",
  data() {
    return {
      user: null,
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("auth_token");
    },
  },
  methods: {
    async fetchUser() {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        const res = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.user = res.data;
      } catch (err) {
        console.error("User fetch error:", err);
      }
    },
    async logoutUser() {
      try {
        const token = localStorage.getItem("auth_token");
        await axios.post(
          "http://127.0.0.1:8000/api/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        localStorage.removeItem("auth_token");
        this.user = null;
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.fetchUser();
    }
  },
};
</script>

<style scoped>
.navbar {
  padding: 0.8rem 1rem;
}
</style>
