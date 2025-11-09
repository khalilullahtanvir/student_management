<template>
  <div class="register-page">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Left Side - Image/Branding -->
        <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-success text-white p-5">
          <div class="text-center">
            <h1 class="display-4 fw-bold mb-4">
              <i class="fa fa-book-reader me-3"></i> Edukate
            </h1>
            <p class="lead mb-4">Join thousands of learners advancing their careers</p>
            <div class="features-list">
              <div class="feature-item d-flex align-items-center mb-3">
                <i class="fas fa-check-circle me-3"></i>
                <span>Access to 500+ courses</span>
              </div>
              <div class="feature-item d-flex align-items-center mb-3">
                <i class="fas fa-check-circle me-3"></i>
                <span>Learn at your own pace</span>
              </div>
              <div class="feature-item d-flex align-items-center mb-3">
                <i class="fas fa-check-circle me-3"></i>
                <span>Get certified upon completion</span>
              </div>
              <div class="feature-item d-flex align-items-center">
                <i class="fas fa-check-circle me-3"></i>
                <span>Join a community of learners</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Registration Form -->
        <div class="col-lg-6 d-flex flex-column justify-content-center align-items-center p-5">
          <div class="register-form-container w-100" style="max-width: 450px;">
            <div class="card border-0 shadow-lg">
              <div class="card-body p-4 p-md-5">
                <h2 class="text-center mb-4">Create Account</h2>
                <p class="text-center text-muted mb-4">Join Edukate and start learning today</p>

                <form @submit.prevent="registerUser">
                  <div class="mb-3">
                    <label for="name" class="form-label fw-semibold">Full Name</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-user"></i>
                      </span>
                      <input 
                        v-model="form.name" 
                        class="form-control" 
                        id="name"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3">
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

                  <div class="mb-3">
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

                  <div class="mb-3">
                    <label for="password_confirmation" class="form-label fw-semibold">Confirm Password</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-lock"></i>
                      </span>
                      <input 
                        v-model="form.password_confirmation" 
                        type="password" 
                        class="form-control" 
                        id="password_confirmation"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="terms">
                      <label class="form-check-label" for="terms">
                        I agree to the <a href="#" class="text-decoration-none">Terms and Conditions</a>
                      </label>
                    </div>
                  </div>

                  <button class="btn btn-success w-100 py-2 mb-4">Create Account</button>
                </form>

                <div v-if="error" class="alert alert-danger mt-3">
                  <i class="fas fa-exclamation-circle me-2"></i>
                  {{ error }}
                </div>
                
                <div v-if="success" class="alert alert-success mt-3">
                  <i class="fas fa-check-circle me-2"></i>
                  {{ success }}
                </div>

                <div class="text-center mt-4">
                  <p class="mb-0">Already have an account? 
                    <router-link to="/login" class="text-decoration-none text-success fw-semibold">Sign In</router-link>
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer Links -->
            <div class="text-center mt-4">
              <p class="text-muted small mb-2">Or register with</p>
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
        const response = await DataService.register(this.form);
        this.success = "Registration successful!";
        if(response.data.token){
          sessionStorage.setItem('uid', response.data.token);
          sessionStorage.setItem('student', JSON.stringify(response.data.student));
        }else{
          alert(response.data.message)
        }
        this.$router.push("/login");
        window.location.href='/login';
      } catch (err) {
        console.error("❌ Register error:", err.response?.data || err);
        this.error = err.response?.data?.message || "Registration failed!";
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.register-form-container {
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
  border-color: #198754;
}

.form-control:focus + .input-group-text {
  border-color: #198754;
}

.btn-success {
  background: linear-gradient(to right, #198754 0%, #20c997 100%);
  border: none;
  padding: 12px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(25, 135, 84, 0.1);
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
  .register-page {
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