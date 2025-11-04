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

        <button class="btn btn-primary w-100">Login</button>
      </form>

      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from "@/api";

export default {
  name: "LoginPage",
  data() {
    return {
      form: { email: "", password: "" },
      error: "",
    };
  },
// LoginPage.vue - এর একটি অংশ
methods: {
    async login() {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: this.email,
                password: this.password
            });

            // সার্ভার থেকে টোকেনটি রিসিভ করুন
            const token = response.data.token;

            // টোকেনটি localStorage এ সেভ করে রাখুন
            localStorage.setItem('auth_token', token);

            // লগইন হয়ে গেলে কোর্স পেজে নিয়ে যান
            this.$router.push('/courses');

        } catch (error) {
            console.error('Login failed:', error.response.data);
        }
    }
}
};
</script>
