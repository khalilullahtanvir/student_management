<template>
  <div class="not-found-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-lg-8 text-center">
          <!-- 404 Animation -->
          <div class="error-animation mb-4">
            <div class="error-number">
              <span class="four">4</span>
              <div class="zero-container">
                <div class="zero">
                  <i class="fas fa-book-reader"></i>
                </div>
              </div>
              <span class="four">4</span>
            </div>
            <div class="error-text">
              <span class="letter">O</span>
              <span class="letter">o</span>
              <span class="letter">p</span>
              <span class="letter">s</span>
              <span class="letter">!</span>
            </div>
          </div>

          <!-- Error Message -->
          <h1 class="error-title mb-3">Page Not Found</h1>
          <p class="error-description mb-4">
            The page you're looking for doesn't exist or has been moved.<br>
            Don't worry, let's get you back on track!
          </p>

          <!-- Search Box -->
          <div class="search-box mb-4">
            <div class="input-group">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search for courses..."
                v-model="searchQuery"
                @keyup.enter="performSearch"
              >
              <button class="btn btn-primary" type="button" @click="performSearch">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <router-link to="/" class="btn btn-primary btn-lg me-3">
              <i class="fas fa-home me-2"></i> Go Home
            </router-link>
            <router-link to="/courses" class="btn btn-outline-primary btn-lg me-3">
              <i class="fas fa-book me-2"></i> Browse Courses
            </router-link>
            <button class="btn btn-outline-secondary btn-lg" @click="goBack">
              <i class="fas fa-arrow-left me-2"></i> Go Back
            </button>
          </div>

          <!-- Helpful Links -->
          <div class="helpful-links mt-5">
            <h4 class="mb-3">You might be looking for:</h4>
            <div class="row justify-content-center">
              <div class="col-md-3 col-6 mb-3">
                <router-link to="/courses" class="link-card">
                  <div class="card border-0 shadow-sm h-100">
                    <div class="card-body text-center">
                      <i class="fas fa-graduation-cap fa-2x text-primary mb-2"></i>
                      <h6 class="mb-0">Courses</h6>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <router-link to="/about" class="link-card">
                  <div class="card border-0 shadow-sm h-100">
                    <div class="card-body text-center">
                      <i class="fas fa-info-circle fa-2x text-info mb-2"></i>
                      <h6 class="mb-0">About Us</h6>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <router-link to="/contact" class="link-card">
                  <div class="card border-0 shadow-sm h-100">
                    <div class="card-body text-center">
                      <i class="fas fa-envelope fa-2x text-success mb-2"></i>
                      <h6 class="mb-0">Contact</h6>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <router-link to="/dashboard" class="link-card">
                  <div class="card border-0 shadow-sm h-100">
                    <div class="card-body text-center">
                      <i class="fas fa-tachometer-alt fa-2x text-warning mb-2"></i>
                      <h6 class="mb-0">Dashboard</h6>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Elements -->
    <div class="floating-elements">
      <div class="floating-book book-1">
        <i class="fas fa-book"></i>
      </div>
      <div class="floating-book book-2">
        <i class="fas fa-book"></i>
      </div>
      <div class="floating-book book-3">
        <i class="fas fa-book"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "NotFoundPage",
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    
    const performSearch = () => {
      if (searchQuery.value.trim()) {
        router.push({ 
          path: '/courses', 
          query: { search: searchQuery.value.trim() } 
        });
      }
    };
    
    const goBack = () => {
      window.history.back();
    };
    
    return {
      searchQuery,
      performSearch,
      goBack
    };
  }
};
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.error-animation {
  margin-bottom: 3rem;
}

.error-number {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.error-number .four {
  font-size: 8rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: bounce 2s infinite;
}

.error-number .four:last-child {
  animation-delay: 0.5s;
}

.zero-container {
  position: relative;
  margin: 0 1rem;
}

.zero {
  width: 120px;
  height: 160px;
  border: 8px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  animation: spin 3s linear infinite;
}

.zero i {
  font-size: 3rem;
  color: white;
}

.error-text {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.error-text .letter {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  opacity: 0;
  animation: fadeInLetter 0.5s ease forwards;
}

.error-text .letter:nth-child(1) { animation-delay: 0.1s; }
.error-text .letter:nth-child(2) { animation-delay: 0.2s; }
.error-text .letter:nth-child(3) { animation-delay: 0.3s; }
.error-text .letter:nth-child(4) { animation-delay: 0.4s; }
.error-text .letter:nth-child(5) { animation-delay: 0.5s; }
.error-text .letter:nth-child(6) { animation-delay: 0.6s; }

.error-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.error-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease 0.2s both;
}

.search-box {
  max-width: 500px;
  margin: 0 auto 2rem;
  animation: fadeInUp 1s ease 0.4s both;
}

.search-box .form-control {
  height: 50px;
  font-size: 1.1rem;
  border: none;
  border-radius: 0;
}

.search-box .btn {
  height: 50px;
  border: none;
  border-radius: 0;
  padding: 0 1.5rem;
}

.action-buttons {
  animation: fadeInUp 1s ease 0.6s both;
}

.btn-lg {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn-lg:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.helpful-links {
  animation: fadeInUp 1s ease 0.8s both;
}

.helpful-links h4 {
  color: white;
  margin-bottom: 1.5rem;
}

.link-card {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.3s ease;
}

.link-card:hover {
  text-decoration: none;
  color: inherit;
  transform: translateY(-5px);
}

.link-card .card {
  transition: all 0.3s ease;
  border-radius: 10px;
}

.link-card:hover .card {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-book {
  position: absolute;
  color: rgba(255, 255, 255, 0.3);
  font-size: 2rem;
  animation: float 6s ease-in-out infinite;
}

.book-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.book-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.book-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

/* Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInLetter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .error-number .four {
    font-size: 5rem;
  }
  
  .zero {
    width: 80px;
    height: 110px;
  }
  
  .zero i {
    font-size: 2rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .btn-lg {
    width: 250px;
  }
}
</style>