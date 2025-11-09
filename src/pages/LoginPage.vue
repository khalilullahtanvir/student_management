<template>
  <div class="login-page">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Left Side - Image/Branding -->
        <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary text-white p-5">
          <div class="text-center">
            <h1 class="display-4 fw-bold mb-4">
              <i class="fa fa-book-reader me-3"></i> Edukate
            </h1>
            <p class="lead mb-4">Empowering learners worldwide with quality education</p>
            <div class="features-list">
              <div class="feature-item d-flex align-items-center mb-3">
                <i class="fas fa-check-circle me-3"></i>
                <span>Expert Instructors</span>
              </div>
              <div class="feature-item d-flex align-items-center mb-3">
                <i class="fas fa-check-circle me-3"></i>
                <span>Flexible Learning</span>
              </div>
              <div class="feature-item d-flex align-items-center">
                <i class="fas fa-check-circle me-3"></i>
                <span>Certified Courses</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Login Form -->
        <div class="col-lg-6 d-flex flex-column justify-content-center align-items-center p-5">
          <div class="login-form-container w-100" style="max-width: 400px;">
            <div class="card border-0 shadow-lg">
              <div class="card-body p-4 p-md-5">
                <h2 class="text-center mb-4">Welcome Back</h2>
                <p class="text-center text-muted mb-4">Sign in to continue to your account</p>

                <form @submit.prevent="loginUser">
                  <div class="mb-4">
                    <label for="email" class="form-label fw-semibold">Email Address</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <input 
                        v-model="form.email" 
                        type="email" 
                        class="form-control" 
                        id="email"
                        placeholder="name@example.com"
                        required 
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label for="password" class="form-label fw-semibold">Password</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-lock"></i>
                      </span>
                      <input 
                        v-model="form.password" 
                        type="password" 
                        class="form-control" 
                        id="password"
                        placeholder="Enter your password"
                        required 
                      />
                    </div>
                  </div>

                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="rememberMe">
                      <label class="form-check-label" for="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" class="text-decoration-none text-primary">Forgot password?</a>
                  </div>

                  <button class="btn btn-primary w-100 py-2 mb-4">Sign In</button>
                </form>

                <div v-if="error" class="alert alert-danger mt-3">
                  <i class="fas fa-exclamation-circle me-2"></i>
                  {{ error }}
                </div>

                <div class="text-center mt-4">
                  <p class="mb-0">Don't have an account? 
                    <router-link to="/register" class="text-decoration-none text-primary fw-semibold">Sign Up</router-link>
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer Links -->
            <div class="text-center mt-4">
              <p class="text-muted small mb-2">Or sign in with</p>
              <div class="d-flex justify-content-center gap-3">
                <a href="#" class="btn btn-outline-secondary rounded-circle">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="btn btn-outline-secondary rounded-circle">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="btn btn-outline-secondary rounded-circle">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="btn btn-outline-secondary rounded-circle">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
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

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.login-form-container {
  animation: fadeInUp 0.5s ease-out;
}

.card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 2.5rem;
}

.form-label {
  color: #495057;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-group {
  position: relative;
}

.input-group-text {
  background-color: #f8f9fa;
  border-right: none;
  color: #6c757d;
}

.form-control {
  border-left: none;
  padding-left: 0;
  height: 50px;
  font-size: 1rem;
}

.form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
}

.form-control:focus + .input-group-text {
  border-color: #0d6efd;
}

.btn-primary {
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 12px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1);
}

.btn-outline-secondary {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: white;
  transform: translateY(-3px);
}

.alert-danger {
  border-radius: 8px;
  border-left: 4px solid #dc3545;
}

.features-list {
  max-width: 300px;
  margin: 0 auto;
}

.feature-item {
  font-size: 1.1rem;
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .login-page {
    padding: 2rem 0;
  }
  
  .card-body {
    padding: 2rem;
  }
}

@media (max-width: 575.98px) {
  .card-body {
    padding: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}
</style>