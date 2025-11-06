<template>
  <div class="container mt-5">
    <div class="card col-md-6 offset-md-3 p-4 shadow">
      <h2 class="text-center mb-4">Create an Account</h2>

      <form @submit.prevent="registerUser">
        <div class="mb-3">
          <label>Name</label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Password</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Confirm Password</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            class="form-control"
            required
          />
        </div>

        <button class="btn btn-success w-100" :disabled="loading">
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </form>

      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      error: "",
      success: "",
      loading: false,
    };
  },
  methods: {
    async registerUser() {
      this.error = "";
      this.success = "";
      this.loading = true;

      try {
        // ✅ Sanctum cookie first
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        // ✅ Send registration data
        const res = await axios.post(
          "http://127.0.0.1:8000/api/register",
          this.form,
          { withCredentials: true }
        );

        const token = res.data.token;
        localStorage.setItem("auth_token", token);

        this.success = "Registration successful!";
        this.form = { name: "", email: "", password: "", password_confirmation: "" };

        // ✅ redirect after registration
        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
      } catch (err) {
        console.error("Registration error:", err);
        if (err.response && err.response.data.errors) {
          const firstError = Object.values(err.response.data.errors)[0][0];
          this.error = firstError;
        } else {
          this.error = "Something went wrong! Please try again.";
        }
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
