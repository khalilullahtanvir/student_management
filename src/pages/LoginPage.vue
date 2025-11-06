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
import DataService from "../services/DataService.js";
import router from "../router/index.js";
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
    loginUser() {
            DataService.login(this.form)
            .then(response => {
              //console.log(response);
              if(response.data.token){
                sessionStorage.setItem('uid', response.data.token);
                sessionStorage.setItem('student', JSON.stringify(response.data.student));
              }else
                alert(response.data.error)
                router.push({ name: 'Dashboard' });
                window.location.href='/dashboard';
            })
            .catch(e => {
              console.log(e);
            });
          }
  }
};
</script>
