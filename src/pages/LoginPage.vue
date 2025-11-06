<template>
  <div class="container mt-5">
    <div class="card col-md-6 offset-md-3 p-4 shadow">
      <h2 class="text-center mb-4">Login</h2>

      <form @submit.prevent="loginUser">
        <div class="mb-3">
          <label>Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Password</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>

        <button class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      form: { email: "", password: "" },
      error: "",
      loading: false,
    };
  },
  methods: {
    async loginUser() {
      this.error = "";
      this.loading = true;

      try {
        // প্রথমে CSRF কুকি রিফ্রেশ করো
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        // লগইন রিকোয়েস্ট পাঠাও
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          this.form,
          { withCredentials: true }
        );

        // ✅ টোকেন localStorage-এ সেভ করো
        const token = response.data.token;
        localStorage.setItem("auth_token", token);

        // ✅ লগইন সফল হলে redirect
        this.$router.push("/courses");
      } catch (error) {
        console.error("Login failed:", error);
        this.error =
          error.response?.data?.message ||
          "Login failed. Please check your credentials.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 80vh;
}
</style>
