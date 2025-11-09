<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="contact-hero py-5 bg-primary text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Get in Touch</h1>
            <p class="lead mb-4">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div class="d-flex flex-wrap gap-3">
              <div class="d-flex align-items-center">
                <i class="fas fa-phone-alt me-2"></i>
                <span>+012 345 67890</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="fas fa-envelope me-2"></i>
                <span>info@edukate.com</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <img src="https://picsum.photos/seed/contact-hero/600/400.jpg" alt="Contact Us" class="img-fluid rounded shadow-lg">
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form & Info Section -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <!-- Contact Form -->
          <div class="col-lg-8 mb-4 mb-lg-0">
            <div class="card shadow-sm border-0">
              <div class="card-body p-4">
                <h3 class="card-title mb-4">Send us a Message</h3>
                
                <form @submit.prevent="submitForm">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="name" class="form-label">Your Name <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        id="name" 
                        class="form-control" 
                        :class="{ 'is-invalid': errors.name }"
                        v-model="form.name" 
                        placeholder="John Doe"
                        required
                      >
                      <div v-if="errors.name" class="invalid-feedback">
                        {{ errors.name }}
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="email" class="form-label">Your Email <span class="text-danger">*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        class="form-control" 
                        :class="{ 'is-invalid': errors.email }"
                        v-model="form.email" 
                        placeholder="john@example.com"
                        required
                      >
                      <div v-if="errors.email" class="invalid-feedback">
                        {{ errors.email }}
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="phone" class="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        class="form-control" 
                        :class="{ 'is-invalid': errors.phone }"
                        v-model="form.phone" 
                        placeholder="+012 345 67890"
                      >
                      <div v-if="errors.phone" class="invalid-feedback">
                        {{ errors.phone }}
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="subject" class="form-label">Subject <span class="text-danger">*</span></label>
                      <select 
                        id="subject" 
                        class="form-select" 
                        :class="{ 'is-invalid': errors.subject }"
                        v-model="form.subject"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                      </select>
                      <div v-if="errors.subject" class="invalid-feedback">
                        {{ errors.subject }}
                      </div>
                    </div>
                  </div>
                  
                  <div class="mb-3">
                    <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                    <textarea 
                      id="message" 
                      class="form-control" 
                      :class="{ 'is-invalid': errors.message }"
                      v-model="form.message" 
                      rows="5"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                    <div v-if="errors.message" class="invalid-feedback">
                      {{ errors.message }}
                    </div>
                  </div>
                  
                  <div class="mb-3">
                    <div class="form-check">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        id="newsletter"
                        v-model="form.newsletter"
                      >
                      <label class="form-check-label" for="newsletter">
                        Send me updates about new courses and offers
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting">
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </span>
                    <span v-else>
                      <i class="fas fa-paper-plane me-2"></i>
                      Send Message
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div class="col-lg-4">
            <div class="card shadow-sm border-0 mb-4">
              <div class="card-body p-4">
                <h4 class="card-title mb-4">Contact Information</h4>
                
                <div class="contact-info-item mb-3">
                  <div class="d-flex align-items-start">
                    <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">Address</h6>
                      <p class="text-muted mb-0">123 Education Street<br>New York, NY 10001</p>
                    </div>
                  </div>
                </div>
                
                <div class="contact-info-item mb-3">
                  <div class="d-flex align-items-start">
                    <div class="icon-box bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-3">
                      <i class="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">Phone</h6>
                      <p class="text-muted mb-0">+012 345 67890<br>+012 345 67891</p>
                    </div>
                  </div>
                </div>
                
                <div class="contact-info-item mb-3">
                  <div class="d-flex align-items-start">
                    <div class="icon-box bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center me-3">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">Email</h6>
                      <p class="text-muted mb-0">info@edukate.com<br>support@edukate.com</p>
                    </div>
                  </div>
                </div>
                
                <div class="contact-info-item">
                  <div class="d-flex align-items-start">
                    <div class="icon-box bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center me-3">
                      <i class="fas fa-clock"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">Business Hours</h6>
                      <p class="text-muted mb-0">Mon - Fri: 9:00 AM - 6:00 PM<br>Sat - Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Social Media -->
            <div class="card shadow-sm border-0">
              <div class="card-body p-4">
                <h4 class="card-title mb-4">Follow Us</h4>
                <div class="d-flex flex-wrap gap-2">
                  <a href="#" class="btn btn-outline-primary btn-sm">
                    <i class="fab fa-facebook-f me-1"></i> Facebook
                  </a>
                  <a href="#" class="btn btn-outline-info btn-sm">
                    <i class="fab fa-twitter me-1"></i> Twitter
                  </a>
                  <a href="#" class="btn btn-outline-danger btn-sm">
                    <i class="fab fa-instagram me-1"></i> Instagram
                  </a>
                  <a href="#" class="btn btn-outline-primary btn-sm">
                    <i class="fab fa-linkedin-in me-1"></i> LinkedIn
                  </a>
                  <a href="#" class="btn btn-outline-danger btn-sm">
                    <i class="fab fa-youtube me-1"></i> YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container-fluid p-0">
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.6779184265177!2d-74.01163808459418!3d40.71274297933043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb5b6e5%3A0x4e5c3e5b5b5b5b5b!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890"
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">Frequently Asked Questions</h2>
          <p class="lead text-muted">Find answers to common questions</p>
        </div>
        
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="accordion" id="faqAccordion">
              <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
                <h2 class="accordion-header" :id="'heading' + index">
                  <button 
                    class="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    :data-bs-target="'#collapse' + index"
                    aria-expanded="false" 
                    :aria-controls="'collapse' + index"
                  >
                    {{ faq.question }}
                  </button>
                </h2>
                <div 
                  :id="'collapse' + index" 
                  class="accordion-collapse collapse" 
                  :aria-labelledby="'heading' + index"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true" ref="successModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Message Sent Successfully!</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { Modal } from 'bootstrap';

export default {
  name: "ContactPage",
  setup() {
    const successModal = ref(null);
    
    // Form data
    const form = reactive({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false
    });
    
    // Component state
    const isSubmitting = ref(false);
    const errors = reactive({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // FAQ data
    const faqs = ref([
      {
        question: "How do I enroll in a course?",
        answer: "You can enroll in a course by browsing our courses page, selecting the course you're interested in, and clicking the 'Enroll Now' button. You'll need to create an account or log in to complete the enrollment process."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment partners."
      },
      {
        question: "Can I get a refund if I'm not satisfied?",
        answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, you can request a full refund within 30 days of enrollment."
      },
      {
        question: "How long do I have access to the course?",
        answer: "Once you enroll in a course, you get lifetime access to the course materials, including all video lessons, downloadable resources, and future updates."
      },
      {
        question: "Do you offer certificates upon completion?",
        answer: "Yes, all our courses come with a certificate of completion. You can download your certificate from your dashboard once you complete all course requirements."
      }
    ]);
    
    // Methods
    const validateForm = () => {
      // Reset errors
      Object.keys(errors).forEach(key => errors[key] = '');
      let isValid = true;
      
      // Name validation
      if (!form.name.trim()) {
        errors.name = 'Name is required';
        isValid = false;
      } else if (form.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
        isValid = false;
      }
      
      // Email validation
      if (!form.email.trim()) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Email is invalid';
        isValid = false;
      }
      
      // Phone validation (optional but if provided, should be valid)
      if (form.phone && !/^[\d\s\-\+\(\)]+$/.test(form.phone)) {
        errors.phone = 'Phone number is invalid';
        isValid = false;
      }
      
      // Subject validation
      if (!form.subject) {
        errors.subject = 'Please select a subject';
        isValid = false;
      }
      
      // Message validation
      if (!form.message.trim()) {
        errors.message = 'Message is required';
        isValid = false;
      } else if (form.message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
        isValid = false;
      }
      
      return isValid;
    };
    
    const submitForm = async () => {
      if (!validateForm()) return;
      
      isSubmitting.value = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success modal
        const modal = new Modal(successModal.value);
        modal.show();
        
        // Reset form
        Object.assign(form, {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          newsletter: false
        });
        
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error (show error message)
      } finally {
        isSubmitting.value = false;
      }
    };
    
    onMounted(() => {
      // Initialize modal
      successModal.value = document.getElementById('successModal');
    });
    
    return {
      form,
      isSubmitting,
      errors,
      faqs,
      submitForm
    };
  }
};
</script>

<style scoped>
.contact-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border-radius: 10px;
  overflow: hidden;
}

.contact-info-item {
  transition: transform 0.3s ease;
}

.contact-info-item:hover {
  transform: translateX(5px);
}

.icon-box {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.map-container {
  position: relative;
  height: 450px;
  overflow: hidden;
}

.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.accordion-button:not(.collapsed) {
  background-color: #f8f9fa;
  color: #0d6efd;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(0, 0, 0, 0.125);
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.form-control:focus, .form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-hero .row {
    text-align: center;
  }
  
  .contact-hero img {
    margin-top: 2rem;
  }
  
  .map-container {
    height: 300px;
  }
}
</style>