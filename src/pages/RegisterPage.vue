<template>
  <div class="container mt-5">
    <div class="card col-md-6 offset-md-3 p-4 shadow">
      <h2 class="text-center mb-4">Register</h2>

      <form @submit.prevent="registerUser">
        <div class="mb-3">
          <label>Name</label>
          <input v-model="form.name" class="form-control" required />
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
          <input v-model="form.password_confirmation" type="password" class="form-control" required />
        </div>

        <button class="btn btn-success w-100">Register</button>
      </form>

      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
    </div>
  </div>
</template>

<script>
import axios from "@/api";

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
    };
  },
  methods: {
    async registerUser() {
      this.error = "";
      this.success = "";
      try {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.post("/api/register", this.form);
        this.success = "Registration successful!";
        console.log("✅ Register success:", response.data);
        this.$router.push("/login");
      } catch (err) {
        console.error("❌ Register error:", err.response?.data || err);
        this.error = err.response?.data?.message || "Registration failed!";
      }
    },
  },
};
</script>
