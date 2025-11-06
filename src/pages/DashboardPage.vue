<template>
  <div class="container mt-5">
    <div class="card shadow col-md-8 offset-md-2 p-4">
      <h2 class="text-center mb-4">Welcome to Your Dashboard 🎓</h2>

      <div v-if="user">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Joined:</strong> {{ new Date(user.created_at).toLocaleDateString() }}</p>
      </div>

      <div v-else class="text-center">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 text-secondary">Loading user info...</p>
      </div>

      <div v-if="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService.js";

export default {
  name: "DashboardPage",
  data() {
    return {
      user: null,
      error: "",
    };
  },
  async mounted() {
    try {
      this.user = JSON.parse(sessionStorage.getItem("student"));
      console.log(this.user);
    } catch (err) {
      this.error = "Failed to load student info. Please log in again.";
    }
  },
};
</script>
