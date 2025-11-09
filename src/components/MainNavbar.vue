<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm">
      <div class="container">
        <!-- Brand -->
        <router-link to="/" class="navbar-brand text-uppercase fw-bold text-primary">
          <i class="fa fa-book-reader me-2"></i> Edukate
        </router-link>

        <!-- Mobile Toggler -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav Links -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav align-items-center">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/courses" class="nav-link">Courses</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </li>
            
            <!-- যদি ইউজার লগইন করে না থাকে -->
            <template v-if="!isLoggedIn">
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Register</router-link>
              </li>
            </template>

            <!-- যদি ইউজার লগইন করে থাকে -->
            <template v-else>
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/enrollment" class="nav-link">Enrollment</router-link>
              </li>
              <li class="nav-item">
                <button class="btn btn-sm btn-outline-primary" @click="logout">Logout</button>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "@/api"; // ধরে নিচ্ছি এখানে baseURL এবং টোকেন হ্যান্ডলার আছে

export default {
  name: "MainNavbar",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  // যখন কম্পোনেন্টটি তৈরি হবে তখন চেক করবে
  created() {
    this.checkLoginStatus();
  },
  // রাউট পরিবর্তন হলেও চেক করবে
  watch: {
    '$route'() {
      this.checkLoginStatus();
    }
  },
  methods: {
    checkLoginStatus() {
      // localStorage এ 'token' key আছে কিনা চেক করছে
      this.isLoggedIn = !!sessionStorage.getItem("uid");
    },
    async logout() {
      try {
        // baseURL থাকায় শুধু '/logout' লিখলেই হবে
        // টোকেন হেডারও স্বয়ংক্রিয়ভাবে যুক্ত হবে যদি @/api ফাইলে সেট করা থাকে
        await axios.post("/logout");
        sessionStorage.removeItem("student");
        sessionStorage.removeItem("uid");
        this.isLoggedIn = false;
        this.$router.push("/login");
      } catch (err) {
        console.error("Logout failed:", err.response?.data || err);
        // সার্ভারে সমস্যা থাকলেও লোকাল থেকে লগআউট করে দিন
        sessionStorage.removeItem("student");
        sessionStorage.removeItem("uid");
        this.isLoggedIn = false;
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.navbar-brand {
  font-size: 1.3rem;
  transition: transform 0.2s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  margin: 0 0.2rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd !important;
}

.nav-link.active {
  font-weight: 600;
  color: #0d6efd !important;
  background-color: rgba(13, 110, 253, 0.1);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background-color: #0d6efd;
  border-radius: 2px;
}

.btn-outline-primary {
  border-width: 1.5px;
  padding: 0.25rem 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-outline-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(13, 110, 253, 0.2);
}

.navbar-toggler {
  border: none;
  padding: 0.25rem 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

/* মোবাইল মেনু স্টাইলিং */
@media (max-width: 991.98px) {
  .navbar-nav {
    padding-top: 1rem;
  }
  
  .nav-item {
    margin-bottom: 0.5rem;
  }
  
  .nav-link {
    margin: 0;
    padding: 0.5rem 1rem;
    border-radius: 0;
  }
  
  .nav-link.active::after {
    display: none;
  }
  
  .btn-outline-primary {
    margin-top: 0.5rem;
    width: calc(100% - 2rem);
    margin-left: 1rem;
  }
}
</style>