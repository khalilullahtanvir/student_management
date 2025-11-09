<template>
  <div>
    <!-- Hero Section -->
    <div class="jumbotron jumbotron-fluid position-relative overlay-bottom mb-5 hero-section">
      <div class="hero-overlay"></div>
      <div class="container text-center my-5 py-5 position-relative">
        <div class="hero-content animate-fade-in">
          <h1 class="text-white mt-4 mb-4 animate-slide-down">Learn From Home</h1>
          <h1 class="text-white display-1 mb-5 animate-slide-up">Education Courses</h1>
          <div class="mx-auto mb-5 animate-zoom-in" style="max-width: 600px;">
            <div class="input-group search-box">
              <button class="btn btn-outline-light bg-white text-body px-4 dropdown-toggle" type="button">
                Courses
              </button>
              <input type="text" class="form-control border-light" placeholder="Keyword" />
              <button class="btn btn-secondary px-4 search-btn">Search</button>
            </div>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <h3 class="text-white">{{ stats.students }}+</h3>
              <p class="text-white">Happy Students</p>
            </div>
            <div class="stat-item">
              <h3 class="text-white">{{ stats.courses }}+</h3>
              <p class="text-white">Popular Courses</p>
            </div>
            <div class="stat-item">
              <h3 class="text-white">{{ stats.instructors }}+</h3>
              <p class="text-white">Expert Instructors</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container-fluid py-5 bg-white">
      <div class="container py-5">
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-laptop-code fa-3x text-primary"></i>
              </div>
              <h4>Online Learning</h4>
              <p class="text-muted">Learn from anywhere at your own pace with our flexible online courses.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-certificate fa-3x text-success"></i>
              </div>
              <h4>Expert Instructors</h4>
              <p class="text-muted">Learn from industry experts with years of experience in their fields.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-graduation-cap fa-3x text-warning"></i>
              </div>
              <h4>Certification</h4>
              <p class="text-muted">Get certified upon completion of courses to boost your career.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="container-fluid py-5 bg-light">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-5 mb-5 mb-lg-0">
            <div class="about-image-wrapper">
              <img class="img-fluid rounded shadow" src="https://picsum.photos/seed/about123/600/500.jpg" alt="About Us" />
              <div class="about-experience-badge">
                <h3>10+ Years</h3>
                <p>Experience</p>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="section-title position-relative mb-4">
              <h6 class="d-inline-block position-relative text-secondary text-uppercase pb-2">About Us</h6>
              <h1 class="display-4">First Choice For Online Education Anywhere</h1>
            </div>
            <p class="lead">We provide quality online courses with expert instructors and modern learning methods.</p>
            <p>Our platform offers a wide range of courses designed to help you achieve your personal and professional goals. With interactive lessons, practical assignments, and supportive community, you'll have everything you need to succeed.</p>
            
            <div class="row pt-3 mx-0">
              <div class="col-6 col-md-3 px-0 mb-3">
                <div class="stat-card bg-success text-white p-3 rounded text-center">
                  <h2 class="counter">{{ stats.subjects }}</h2>
                  <p class="m-0">Subjects</p>
                </div>
              </div>
              <div class="col-6 col-md-3 px-0 mb-3">
                <div class="stat-card bg-primary text-white p-3 rounded text-center">
                  <h2 class="counter">{{ stats.courses }}</h2>
                  <p class="m-0">Courses</p>
                </div>
              </div>
              <div class="col-6 col-md-3 px-0 mb-3">
                <div class="stat-card bg-secondary text-white p-3 rounded text-center">
                  <h2 class="counter">{{ stats.instructors }}</h2>
                  <p class="m-0">Instructors</p>
                </div>
              </div>
              <div class="col-6 col-md-3 px-0 mb-3">
                <div class="stat-card bg-warning text-white p-3 rounded text-center">
                  <h2 class="counter">{{ stats.students }}</h2>
                  <p class="m-0">Students</p>
                </div>
              </div>
            </div>
            
            <div class="mt-4">
              <router-link to="/about" class="btn btn-primary px-4 py-2">Learn More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Courses Section -->
    <div class="container-fluid px-0 py-5 bg-white">
      <div class="row mx-0 justify-content-center pt-5">
        <div class="col-lg-6">
          <div class="section-title text-center position-relative mb-4">
            <h6 class="d-inline-block position-relative text-secondary text-uppercase pb-2">Our Courses</h6>
            <h1 class="display-5">Checkout New Releases Of Our Courses</h1>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row justify-content-center">
          <div
            v-for="(course, index) in courses"
            :key="index"
            class="col-lg-4 col-md-6 mb-4"
          >
            <div class="course-card card border-0 shadow-sm h-100">
              <div class="course-img-container position-relative overflow-hidden">
                <img
                  :src="course.image || 'https://picsum.photos/seed/course' + index + '/400/250.jpg'"
                  class="card-img-top course-img"
                  alt="course"
                />
                <div class="course-badge bg-primary text-white px-3 py-1">
                  {{ course.category || 'Popular' }}
                </div>
                <div class="course-price bg-white text-primary px-3 py-1">
                  ${{ course.price || '99' }}
                </div>
              </div>
              <div class="card-body text-center">
                <h5 class="card-title text-primary">{{ course.title }}</h5>
                <div class="course-meta mb-2">
                  <small class="text-muted">
                    <i class="fas fa-clock mr-1"></i> {{ course.duration || '8 weeks' }}
                    <span class="mx-2">|</span>
                    <i class="fas fa-signal mr-1"></i> {{ course.level || 'Beginner' }}
                  </small>
                </div>
                <p class="card-text text-muted">{{ course.description.substring(0, 100) }}...</p>
                <div class="course-rating mb-3">
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star-half-alt text-warning"></i>
                  <span class="text-muted ml-2">({{ getRandomRating() }})</span>
                </div>
              </div>
              <div class="card-footer bg-white text-center border-0 pt-0">
                <router-link :to="`/courses/${course.id}`" class="btn btn-outline-primary btn-sm">
                  View Details
                </router-link>
                <button class="btn btn-primary btn-sm ml-2">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5">
          <router-link to="/courses" class="btn btn-outline-primary px-4 py-2">
            View All Courses
          </router-link>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="container-fluid py-5 bg-light">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h6 class="text-secondary text-uppercase">Testimonials</h6>
          <h1 class="display-5">What Our Students Say</h1>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="testimonial-card card border-0 shadow-sm p-4 h-100">
              <div class="testimonial-content mb-3">
                <i class="fas fa-quote-left text-primary mb-3"></i>
                <p class="text-muted">The courses are well-structured and the instructors are very knowledgeable. I've learned so much in just a few months!</p>
              </div>
              <div class="testimonial-author d-flex align-items-center">
                <img src="https://picsum.photos/seed/user1/50/50.jpg" class="rounded-circle mr-3" width="50" height="50" alt="user" />
                <div>
                  <h6 class="mb-0">Alex Johnson</h6>
                  <small class="text-muted">Web Developer</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="testimonial-card card border-0 shadow-sm p-4 h-100">
              <div class="testimonial-content mb-3">
                <i class="fas fa-quote-left text-primary mb-3"></i>
                <p class="text-muted">I love the flexibility of learning at my own pace. The platform is user-friendly and the content is top-notch!</p>
              </div>
              <div class="testimonial-author d-flex align-items-center">
                <img src="https://picsum.photos/seed/user2/50/50.jpg" class="rounded-circle mr-3" width="50" height="50" alt="user" />
                <div>
                  <h6 class="mb-0">Sarah Williams</h6>
                  <small class="text-muted">UI/UX Designer</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="testimonial-card card border-0 shadow-sm p-4 h-100">
              <div class="testimonial-content mb-3">
                <i class="fas fa-quote-left text-primary mb-3"></i>
                <p class="text-muted">The certification I received helped me land my dream job. Thank you for providing such quality education!</p>
              </div>
              <div class="testimonial-author d-flex align-items-center">
                <img src="https://picsum.photos/seed/user3/50/50.jpg" class="rounded-circle mr-3" width="50" height="50" alt="user" />
                <div>
                  <h6 class="mb-0">Michael Chen</h6>
                  <small class="text-muted">Data Analyst</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="container py-5 bg-white">
      <div class="text-center mb-5">
        <h6 class="text-secondary text-uppercase">Instructors</h6>
        <h1 class="display-5">Meet Our Top Instructors</h1>
      </div>
      <div class="row">
        <div v-for="(t, i) in team" :key="i" class="col-md-3 mb-4">
          <div class="team-card card border-0 shadow-sm text-center h-100">
            <div class="team-img-container position-relative overflow-hidden">
              <img :src="t.image" class="card-img-top team-img" alt="" />
              <div class="team-social">
                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div class="card-body">
              <h5>{{ t.name }}</h5>
              <p class="text-muted small">{{ t.role }}</p>
              <p class="text-muted small">{{ t.courses || '5 Courses' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="container-fluid py-5 bg-primary text-white">
      <div class="container py-5 text-center">
        <h1 class="display-4 mb-4">Ready to Start Learning?</h1>
        <p class="lead mb-4">Join thousands of students who are already learning with us</p>
        <router-link to="/register" class="btn btn-light btn-lg px-4 py-2">
          Get Started Now
        </router-link>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import apiClient from "@/api"

const courses = ref([])
const stats = ref({
  subjects: 10,
  courses: 25,
  instructors: 8,
  students: 500,
})

const team = ref([
  { name: "John Doe", role: "Web Instructor", image: "https://picsum.photos/seed/team1/300/300.jpg", courses: "8 Courses" },
  { name: "Jane Smith", role: "App Developer", image: "https://picsum.photos/seed/team2/300/300.jpg", courses: "6 Courses" },
  { name: "Ali Khan", role: "UI/UX Designer", image: "https://picsum.photos/seed/team3/300/300.jpg", courses: "5 Courses" },
  { name: "Sara Lee", role: "Digital Marketer", image: "https://picsum.photos/seed/team4/300/300.jpg", courses: "7 Courses" },
])

// 生成随机评分
const getRandomRating = () => {
  return Math.floor(Math.random() * 500) + 100
}

onMounted(async () => {
  try {
    const res = await apiClient.get("/courses")
    courses.value = Array.isArray(res.data) ? res.data : []
    
    // 动画计数器
    animateCounters()
  } catch (error) {
    console.error("Failed to load courses", error)
    courses.value = []
  }
})

const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  
  counters.forEach(counter => {
    const animate = () => {
      const value = +counter.getAttribute('data-count') || +counter.innerText;
      const data = +counter.innerText;
      const time = value / speed;
      
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      } else {
        counter.innerText = value;
      }
    }
    
    // 设置初始数据属性
    counter.setAttribute('data-count', counter.innerText);
    // 重置计数器为0
    counter.innerText = 0;
    // 开始动画
    setTimeout(animate, 500);
  });
}
</script>

<style scoped>
/* Hero Section Styles */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://picsum.photos/seed/herobg/1920/1080.jpg') center center/cover;
  opacity: 0.2;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-stats {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.hero-stats .stat-item {
  margin: 0 1.5rem;
  text-align: center;
}

.hero-stats .stat-item h3 {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.search-box {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  overflow: hidden;
}

.search-btn {
  border-radius: 0 50px 50px 0;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-down {
  animation: slideDown 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out 0.3s both;
}

.animate-zoom-in {
  animation: zoomIn 1s ease-out 0.6s both;
}

/* Feature Cards */
.feature-card {
  transition: all 0.3s ease;
  border-radius: 10px;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 123, 255, 0.1);
}

/* About Section */
.about-image-wrapper {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.about-experience-badge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.about-experience-badge h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.about-experience-badge p {
  margin: 0;
  font-size: 0.9rem;
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Course Cards */
.course-card {
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.course-img-container {
  height: 220px;
}

.course-img {
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card:hover .course-img {
  transform: scale(1.1);
}

.course-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.course-price {
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: 20px;
  font-weight: bold;
}

.course-rating i {
  font-size: 0.9rem;
}

/* Testimonial Cards */
.testimonial-card {
  transition: all 0.3s ease;
  border-radius: 10px;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Team Cards */
.team-card {
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.team-img-container {
  height: 250px;
}

.team-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-card:hover .team-img {
  transform: scale(1.1);
}

.team-social {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.team-card:hover .team-social {
  opacity: 1;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: white;
  color: #764ba2;
  border-radius: 50%;
  margin: 0 5px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #764ba2;
  color: white;
  transform: translateY(-3px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-stats .stat-item {
    margin: 1rem 0;
  }
  
  .display-1 {
    font-size: 3rem;
  }
}
</style>