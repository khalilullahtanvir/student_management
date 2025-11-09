<template>
  <div class="footer-container">
    <!-- Back to Top Button -->
    <button 
      class="back-to-top" 
      :class="{ 'show': showBackToTop }"
      @click="scrollToTop"
    >
      <i class="fas fa-arrow-up"></i>
    </button>

    <!-- Main Footer -->
    <div class="container-fluid position-relative overlay-top bg-dark text-white-50 py-5" style="margin-top: 90px;">
      <div class="container mt-5 pt-5">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-5">
            <router-link to="/" class="navbar-brand">
              <h1 class="mt-n2 text-uppercase text-white"><i class="fa fa-book-reader mr-3"></i>Edukate</h1>
            </router-link>
            <p class="m-0">Accusam nonumy clita sed rebum kasd eirmod elitr. Ipsum ea lorem at et diam est, tempor rebum ipsum sit ea tempor stet et consetetur dolores.</p>
            <div class="d-flex justify-content-start mt-4 social-links">
              <a class="text-white mr-3" href="#" title="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="text-white mr-3" href="#" title="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a class="text-white mr-3" href="#" title="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a class="text-white mr-3" href="#" title="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="text-white" href="#" title="YouTube">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6 mb-5">
            <h3 class="text-white mb-4 position-relative footer-heading">
              <span>Newsletter</span>
              <div class="heading-line"></div>
            </h3>
            <p class="mb-3">Subscribe to our newsletter to get the latest updates and offers.</p>
            <div class="w-100 newsletter-form">
              <form @submit.prevent="subscribeNewsletter">
                <div class="input-group">
                  <input 
                    type="email" 
                    class="form-control border-light" 
                    style="padding: 15px;" 
                    placeholder="Your Email Address"
                    v-model="newsletterEmail"
                    required
                  >
                  <div class="input-group-append">
                    <button class="btn btn-primary px-4" type="submit" :disabled="subscribing">
                      <span v-if="!subscribing">Sign Up</span>
                      <span v-else><i class="fas fa-spinner fa-spin"></i></span>
                    </button>
                  </div>
                </div>
              </form>
              <div v-if="newsletterMessage" class="mt-2 alert" :class="newsletterSuccess ? 'alert-success' : 'alert-danger'">
                {{ newsletterMessage }}
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6 mb-5">
            <h3 class="text-white mb-4 position-relative footer-heading">
              <span>Get In Touch</span>
              <div class="heading-line"></div>
            </h3>
            <div class="contact-info">
              <p><i class="fas fa-map-marker-alt mr-2"></i>123 Street, New York, USA</p>
              <p><i class="fas fa-phone-alt mr-2"></i>+012 345 67890</p>
              <p><i class="fas fa-envelope mr-2"></i>info@example.com</p>
              <p><i class="fas fa-clock mr-2"></i>Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
        
        <div class="row mt-4">
          <div class="col-md-4 mb-5">
            <h3 class="text-white mb-4 position-relative footer-heading">
              <span>Our Courses</span>
              <div class="heading-line"></div>
            </h3>
            <div class="d-flex flex-column justify-content-start">
              <router-link to="/courses/web-design" class="text-white-50 mb-2 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Web Design
              </router-link>
              <router-link to="/courses/apps-design" class="text-white-50 mb-2 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Apps Design
              </router-link>
              <router-link to="/courses/marketing" class="text-white-50 mb-2 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Marketing
              </router-link>
              <router-link to="/courses/research" class="text-white-50 mb-2 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Research
              </router-link>
              <router-link to="/courses/seo" class="text-white-50 footer-link">
                <i class="fas fa-angle-right mr-2"></i>SEO
              </router-link>
            </div>
          </div>
          
          <div class="col-md-4 mb-5">
            <h3 class="text-white mb-4 position-relative footer-heading">
              <span>Quick Links</span>
              <div class="heading-line"></div>
            </h3>
            <div class="d-flex flex-column justify-content-start">
              <router-link to="/privacy-policy" class="text-white-50 mb-2 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Privacy Policy
              </router-link>
              <router-link to="/terms" class="text-white-50 mb-2 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Terms & Condition
              </router-link>
              <router-link to="/faqs" class="text-white-50 mb-2 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Regular FAQs
              </router-link>
              <router-link to="/help" class="text-white-50 mb-2 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Help & Support
              </router-link>
              <router-link to="/contact" class="text-white-50 footer-link">
                <i class="fas fa-angle-right mr-2"></i>Contact
              </router-link>
            </div>
          </div>
          
          <div class="col-md-4 mb-5">
            <h3 class="text-white mb-4 position-relative footer-heading">
              <span>Gallery</span>
              <div class="heading-line"></div>
            </h3>
            <div class="gallery-container">
              <div class="row gallery-row">
                <div class="col-4 mb-2">
                  <img src="https://picsum.photos/seed/footer1/100/100.jpg" alt="Gallery Image" class="img-fluid gallery-img">
                </div>
                <div class="col-4 mb-2">
                  <img src="https://picsum.photos/seed/footer2/100/100.jpg" alt="Gallery Image" class="img-fluid gallery-img">
                </div>
                <div class="col-4 mb-2">
                  <img src="https://picsum.photos/seed/footer3/100/100.jpg" alt="Gallery Image" class="img-fluid gallery-img">
                </div>
                <div class="col-4 mb-2">
                  <img src="https://picsum.photos/seed/footer4/100/100.jpg" alt="Gallery Image" class="img-fluid gallery-img">
                </div>
                <div class="col-4 mb-2">
                  <img src="https://picsum.photos/seed/footer5/100/100.jpg" alt="Gallery Image" class="img-fluid gallery-img">
                </div>
                <div class="col-4 mb-2">
                  <img src="https://picsum.photos/seed/footer6/100/100.jpg" alt="Gallery Image" class="img-fluid gallery-img">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Copyright -->
    <div class="container-fluid bg-dark text-white-50 border-top py-4" style="border-color: rgba(256, 256, 256, .1) !important;">
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
            <p class="m-0">Copyright &copy; {{ currentYear }} <a class="text-white" href="#">Edukate</a>. All Rights Reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-right">
            <p class="m-0">Designed by <a class="text-white" href="https://htmlcodex.com">HTML Codex</a> Distributed by <a href="https://themewagon.com" target="_blank">ThemeWagon</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api'

// Newsletter functionality
const newsletterEmail = ref('')
const subscribing = ref(false)
const newsletterMessage = ref('')
const newsletterSuccess = ref(false)

// Back to top functionality
const showBackToTop = ref(false)

// Current year for copyright
const currentYear = new Date().getFullYear()

// Newsletter subscription
const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) return
  
  subscribing.value = true
  newsletterMessage.value = ''
  
  try {
    // Here you would typically make an API call to your backend
    // await apiClient.post('/newsletter/subscribe', { email: newsletterEmail.value })
    
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    newsletterMessage.value = 'Thank you for subscribing to our newsletter!'
    newsletterSuccess.value = true
    newsletterEmail.value = ''
    
    // Reset message after 5 seconds
    setTimeout(() => {
      newsletterMessage.value = ''
    }, 5000)
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    newsletterMessage.value = 'Failed to subscribe. Please try again later.'
    newsletterSuccess.value = false
  } finally {
    subscribing.value = false
  }
}

// Back to top functionality
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Clean up event listener
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
/* Footer Container */
.footer-container {
  position: relative;
  overflow: hidden;
}

/* Footer Heading */
.footer-heading {
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
}

.footer-heading span {
  position: relative;
  z-index: 1;
}

.heading-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #007bff, #764ba2);
  border-radius: 3px;
}

/* Social Links */
.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: #007bff;
  transform: translateY(-3px);
}

/* Newsletter Form */
.newsletter-form .form-control {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.newsletter-form .form-control::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.newsletter-form .form-control:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  color: white;
}

/* Footer Links */
.footer-link {
  transition: all 0.3s ease;
  position: relative;
  padding-left: 5px;
}

.footer-link:hover {
  color: white !important;
  padding-left: 10px;
  text-decoration: none;
}

/* Gallery */
.gallery-img {
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-img:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Contact Info */
.contact-info p {
  transition: all 0.3s ease;
}

.contact-info p:hover {
  color: white !important;
  transform: translateX(5px);
}

/* Alert Styling */
.alert {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.alert-success {
  background-color: rgba(40, 167, 69, 0.2);
  border-color: rgba(40, 167, 69, 0.3);
  color: #28a745;
}

.alert-danger {
  background-color: rgba(220, 53, 69, 0.2);
  border-color: rgba(220, 53, 69, 0.3);
  color: #dc3545;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}
</style>