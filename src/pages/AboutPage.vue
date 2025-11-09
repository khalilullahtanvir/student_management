<template>
  <div>
    <!-- Hero Section -->
    <section class="about-hero py-5 bg-primary text-white position-relative overflow-hidden">
      <div class="container position-relative z-index-1">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="display-4 fw-bold mb-4 animate__animated animate__fadeInLeft">About Edukate</h1>
              <p class="lead mb-4 animate__animated animate__fadeInLeft animate__delay-1s">
                Empowering learners worldwide with modern, flexible, and high-quality online education.
              </p>
              <div class="d-flex flex-wrap gap-3 animate__animated animate__fadeInLeft animate__delay-2s">
                <router-link to="/courses" class="btn btn-light btn-lg">
                  <i class="fas fa-book-open me-2"></i>Explore Courses
                </router-link>
                <router-link to="/contact" class="btn btn-outline-light btn-lg">
                  <i class="fas fa-envelope me-2"></i>Contact Us
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image text-center animate__animated animate__fadeInRight">
              <img src="https://picsum.photos/seed/edukate-hero/600/400.jpg" alt="Edukate Education" class="img-fluid rounded shadow-lg">
            </div>
          </div>
        </div>
      </div>
      <div class="hero-pattern"></div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="card h-100 border-0 shadow-sm p-4">
              <div class="card-body">
                <div class="mb-4">
                  <div class="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3">
                    <i class="fas fa-bullseye fa-2x"></i>
                  </div>
                  <h3 class="card-title">Our Mission</h3>
                </div>
                <p class="card-text">
                  To democratize education by providing accessible, affordable, and high-quality learning opportunities to everyone, regardless of their location or background. We strive to bridge the knowledge gap and empower individuals to achieve their personal and professional goals.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card h-100 border-0 shadow-sm p-4">
              <div class="card-body">
                <div class="mb-4">
                  <div class="icon-box bg-success text-white rounded-circle d-flex align-items-center justify-content-center mb-3">
                    <i class="fas fa-eye fa-2x"></i>
                  </div>
                  <h3 class="card-title">Our Vision</h3>
                </div>
                <p class="card-text">
                  To become the world's leading online education platform, known for excellence in teaching, innovative learning methods, and a community that fosters continuous growth and development. We envision a future where quality education is a right, not a privilege.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <h2 class="display-4 fw-bold text-primary counter" data-target="5000">0</h2>
              <p class="text-muted">Happy Students</p>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <h2 class="display-4 fw-bold text-success counter" data-target="120">0</h2>
              <p class="text-muted">Expert Instructors</p>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <h2 class="display-4 fw-bold text-info counter" data-target="300">0</h2>
              <p class="text-muted">Online Courses</p>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <h2 class="display-4 fw-bold text-warning counter" data-target="98">0</h2>
              <p class="text-muted">Success Rate %</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">Why Choose Edukate?</h2>
          <p class="lead text-muted">We offer a unique learning experience with these key features</p>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4">
            <div class="feature-card h-100 p-4">
              <div class="feature-icon bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mb-3">
                <i class="fas fa-laptop fa-2x"></i>
              </div>
              <h4 class="mb-3">Flexible Learning</h4>
              <p>Learn at your own pace with our flexible schedule. Access courses anytime, anywhere, and from any device.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="feature-card h-100 p-4">
              <div class="feature-icon bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center mb-3">
                <i class="fas fa-certificate fa-2x"></i>
              </div>
              <h4 class="mb-3">Certified Courses</h4>
              <p>Get industry-recognized certificates upon course completion to boost your resume and career prospects.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="feature-card h-100 p-4">
              <div class="feature-icon bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center mb-3">
                <i class="fas fa-users fa-2x"></i>
              </div>
              <h4 class="mb-3">Expert Instructors</h4>
              <p>Learn from industry experts with years of experience and deep knowledge in their respective fields.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="feature-card h-100 p-4">
              <div class="feature-icon bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center mb-3">
                <i class="fas fa-comments fa-2x"></i>
              </div>
              <h4 class="mb-3">Community Support</h4>
              <p>Join a vibrant community of learners, get help from peers, and participate in discussions and forums.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="feature-card h-100 p-4">
              <div class="feature-icon bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center mb-3">
                <i class="fas fa-headset fa-2x"></i>
              </div>
              <h4 class="mb-3">24/7 Support</h4>
              <p>Get help whenever you need it with our round-the-clock customer support and technical assistance.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="feature-card h-100 p-4">
              <div class="feature-icon bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center mb-3">
                <i class="fas fa-sync fa-2x"></i>
              </div>
              <h4 class="mb-3">Lifetime Access</h4>
              <p>Enjoy lifetime access to course materials, updates, and community forums once you enroll.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">Meet Our Team</h2>
          <p class="lead text-muted">The passionate people behind Edukate</p>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="(member, index) in teamMembers" :key="index">
            <div class="team-card text-center">
              <div class="team-image mb-3">
                <img :src="member.image" :alt="member.name" class="img-fluid rounded-circle">
              </div>
              <h4>{{ member.name }}</h4>
              <p class="text-muted">{{ member.position }}</p>
              <div class="social-links d-flex justify-content-center">
                <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-link"><i class="fas fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">What Our Students Say</h2>
          <p class="lead text-muted">Real experiences from our learners</p>
        </div>
        <div class="row g-4">
          <div class="col-md-4" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-card h-100 p-4">
              <div class="testimonial-content mb-3">
                <i class="fas fa-quote-left text-primary mb-3"></i>
                <p>{{ testimonial.content }}</p>
              </div>
              <div class="testimonial-author d-flex align-items-center">
                <img :src="testimonial.image" :alt="testimonial.name" class="rounded-circle me-3" width="50" height="50">
                <div>
                  <h6 class="mb-0">{{ testimonial.name }}</h6>
                  <small class="text-muted">{{ testimonial.role }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white">
      <div class="container text-center">
        <h2 class="display-5 fw-bold mb-4">Ready to Start Your Learning Journey?</h2>
        <p class="lead mb-4">Join thousands of students who are already learning with Edukate</p>
        <router-link to="/register" class="btn btn-light btn-lg">
          <i class="fas fa-user-plus me-2"></i>Get Started Now
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: "AboutPage",
  setup() {
    const teamMembers = [
      {
        name: "Sarah Johnson",
        position: "CEO & Founder",
        image: "https://picsum.photos/seed/team1/300/300.jpg"
      },
      {
        name: "Michael Chen",
        position: "Head of Curriculum",
        image: "https://picsum.photos/seed/team2/300/300.jpg"
      },
      {
        name: "Emily Rodriguez",
        position: "Lead Instructor",
        image: "https://picsum.photos/seed/team3/300/300.jpg"
      },
      {
        name: "David Williams",
        position: "Tech Director",
        image: "https://picsum.photos/seed/team4/300/300.jpg"
      }
    ];

    const testimonials = [
      {
        name: "Alex Thompson",
        role: "Web Developer",
        image: "https://picsum.photos/seed/user1/100/100.jpg",
        content: "Edukate transformed my career. The courses are comprehensive, and the instructors are incredibly knowledgeable. I landed my dream job after completing the Full Stack Development course."
      },
      {
        name: "Priya Patel",
        role: "UX Designer",
        image: "https://picsum.photos/seed/user2/100/100.jpg",
        content: "The flexibility of learning at my own pace was a game-changer. The community support and resources provided helped me transition from a different field into UX design successfully."
      },
      {
        name: "James Wilson",
        role: "Data Analyst",
        image: "https://picsum.photos/seed/user3/100/100.jpg",
        content: "I've tried other online learning platforms, but Edukate stands out with its quality content and practical approach. The projects and assignments really helped me build a strong portfolio."
      }
    ];

    onMounted(() => {
      // Animate counters
      const counters = document.querySelectorAll('.counter');
      const speed = 200;
      
      counters.forEach(counter => {
        const animate = () => {
          const value = +counter.getAttribute('data-target');
          const data = +counter.innerText;
          const time = value / speed;
          
          if (data < value) {
            counter.innerText = Math.ceil(data + time);
            setTimeout(animate, 1);
          } else {
            counter.innerText = value;
          }
        }
        
        animate();
      });
    });

    return {
      teamMembers,
      testimonials
    };
  }
};
</script>

<style scoped>
.about-hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 0;
}

.z-index-1 {
  position: relative;
  z-index: 1;
}

.icon-box {
  width: 60px;
  height: 60px;
}

.feature-card, .testimonial-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
}

.feature-card:hover, .testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 70px;
  height: 70px;
}

.team-card {
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 5px solid #f8f9fa;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #f8f9fa;
  border-radius: 50%;
  margin: 0 5px;
  color: #6c757d;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #0d6efd;
  color: white;
  transform: translateY(-3px);
}

.testimonial-card {
  background-color: #f8f9fa;
  border-radius: 10px;
}

/* Add animate.css CDN or implement your own animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animate__fadeInLeft {
  animation-name: fadeInLeft;
}

.animate__fadeInRight {
  animation-name: fadeInRight;
}

.animate__delay-1s {
  animation-delay: 0.5s;
}

.animate__delay-2s {
  animation-delay: 1s;
}
</style>