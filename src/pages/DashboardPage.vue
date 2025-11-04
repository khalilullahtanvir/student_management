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
import axios from "@/api";

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
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
        return;
      }

      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.user = response.data;
      console.log("✅ User data:", this.user);
    } catch (err) {
      console.error("❌ User fetch failed:", err.response?.data || err);
      this.error = "Failed to load user info. Please log in again.";
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  },
};
</script>
