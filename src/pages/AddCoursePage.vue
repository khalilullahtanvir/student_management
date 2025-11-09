<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h2 class="mb-0">
              <i class="fas fa-plus-circle me-2"></i>Add New Course
            </h2>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="submitCourse" @keydown="form.errors.clear($event.target.name)">
              <!-- Course Title -->
              <div class="mb-4">
                <label for="title" class="form-label">Course Title <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  id="title" 
                  class="form-control" 
                  :class="{ 'is-invalid': form.errors.has('title') }"
                  v-model="course.title" 
                  placeholder="Enter course title"
                  required
                >
                <div v-if="form.errors.has('title')" class="invalid-feedback">
                  {{ form.errors.get('title') }}
                </div>
              </div>

              <!-- Course Description -->
              <div class="mb-4">
                <label for="description" class="form-label">Course Description <span class="text-danger">*</span></label>
                <textarea 
                  id="description" 
                  class="form-control" 
                  :class="{ 'is-invalid': form.errors.has('description') }"
                  v-model="course.description" 
                  rows="5"
                  placeholder="Provide a detailed description of the course"
                  required
                ></textarea>
                <div v-if="form.errors.has('description')" class="invalid-feedback">
                  {{ form.errors.get('description') }}
                </div>
              </div>

              <div class="row">
                <!-- Category -->
                <div class="col-md-6 mb-4">
                  <label for="category" class="form-label">Category <span class="text-danger">*</span></label>
                  <select 
                    id="category" 
                    class="form-select" 
                    :class="{ 'is-invalid': form.errors.has('category') }"
                    v-model="course.category"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="web-development">Web Development</option>
                    <option value="app-development">App Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="business">Business</option>
                  </select>
                  <div v-if="form.errors.has('category')" class="invalid-feedback">
                    {{ form.errors.get('category') }}
                  </div>
                </div>

                <!-- Level -->
                <div class="col-md-6 mb-4">
                  <label for="level" class="form-label">Level <span class="text-danger">*</span></label>
                  <select 
                    id="level" 
                    class="form-select" 
                    :class="{ 'is-invalid': form.errors.has('level') }"
                    v-model="course.level"
                    required
                  >
                    <option value="" disabled>Select a level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <div v-if="form.errors.has('level')" class="invalid-feedback">
                    {{ form.errors.get('level') }}
                  </div>
                </div>
              </div>

              <div class="row">
                <!-- Duration -->
                <div class="col-md-6 mb-4">
                  <label for="duration" class="form-label">Duration (weeks) <span class="text-danger">*</span></label>
                  <input 
                    type="number" 
                    id="duration" 
                    class="form-control" 
                    :class="{ 'is-invalid': form.errors.has('duration') }"
                    v-model="course.duration" 
                    min="1"
                    placeholder="Course duration in weeks"
                    required
                  >
                  <div v-if="form.errors.has('duration')" class="invalid-feedback">
                    {{ form.errors.get('duration') }}
                  </div>
                </div>

                <!-- Price -->
                <div class="col-md-6 mb-4">
                  <label for="price" class="form-label">Price ($) <span class="text-danger">*</span></label>
                  <input 
                    type="number" 
                    id="price" 
                    class="form-control" 
                    :class="{ 'is-invalid': form.errors.has('price') }"
                    v-model="course.price" 
                    min="0"
                    step="0.01"
                    placeholder="Course price"
                    required
                  >
                  <div v-if="form.errors.has('price')" class="invalid-feedback">
                    {{ form.errors.get('price') }}
                  </div>
                </div>
              </div>

              <!-- Instructor -->
              <div class="mb-4">
                <label for="instructor" class="form-label">Instructor <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  id="instructor" 
                  class="form-control" 
                  :class="{ 'is-invalid': form.errors.has('instructor') }"
                  v-model="course.instructor" 
                  placeholder="Instructor name"
                  required
                >
                <div v-if="form.errors.has('instructor')" class="invalid-feedback">
                  {{ form.errors.get('instructor') }}
                </div>
              </div>

              <!-- Course Image -->
              <div class="mb-4">
                <label for="image" class="form-label">Course Image URL</label>
                <input 
                  type="url" 
                  id="image" 
                  class="form-control" 
                  :class="{ 'is-invalid': form.errors.has('image') }"
                  v-model="course.image" 
                  placeholder="https://example.com/course-image.jpg"
                >
                <div v-if="form.errors.has('image')" class="invalid-feedback">
                  {{ form.errors.get('image') }}
                </div>
                <div v-if="course.image" class="mt-2">
                  <img :src="course.image" alt="Course preview" class="img-thumbnail" style="max-height: 200px;">
                </div>
              </div>

              <!-- What You'll Learn -->
              <div class="mb-4">
                <label class="form-label">What You'll Learn</label>
                <div v-for="(item, index) in course.whatYouLearn" :key="index" class="input-group mb-2">
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="course.whatYouLearn[index]" 
                    placeholder="Learning outcome"
                  >
                  <button class="btn btn-outline-danger" type="button" @click="removeLearningItem(index)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <button type="button" class="btn btn-sm btn-outline-primary" @click="addLearningItem">
                  <i class="fas fa-plus me-1"></i>Add Learning Outcome
                </button>
              </div>

              <!-- Requirements -->
              <div class="mb-4">
                <label class="form-label">Requirements</label>
                <div v-for="(item, index) in course.requirements" :key="index" class="input-group mb-2">
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="course.requirements[index]" 
                    placeholder="Course requirement"
                  >
                  <button class="btn btn-outline-danger" type="button" @click="removeRequirement(index)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <button type="button" class="btn btn-sm btn-outline-primary" @click="addRequirement">
                  <i class="fas fa-plus me-1"></i>Add Requirement
                </button>
              </div>

              <!-- Course Status -->
              <div class="mb-4">
                <div class="form-check form-switch">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="status" 
                    v-model="course.status"
                    true-value="published"
                    false-value="draft"
                  >
                  <label class="form-check-label" for="status">
                    Publish immediately
                  </label>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-between">
                <router-link to="/courses" class="btn btn-secondary">
                  <i class="fas fa-arrow-left me-1"></i> Back to Courses
                </router-link>
                <div>
                  <button type="button" class="btn btn-outline-primary me-2" @click="saveAsDraft">
                    <i class="fas fa-save me-1"></i> Save as Draft
                  </button>
                  <button type="submit" class="btn btn-primary" :disabled="form.processing">
                    <span v-if="form.processing">
                      <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Processing...
                    </span>
                    <span v-else>
                      <i class="fas fa-plus-circle me-1"></i> Add Course
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true" ref="successModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Success!</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>{{ successMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <router-link to="/courses" class="btn btn-primary" data-bs-dismiss="modal">View Courses</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import apiClient from '@/api';

export default {
  name: "AddCoursePage",
  setup() {
    const router = useRouter();
    const successModal = ref(null);
    const successMessage = ref('');
    
    // Form object with validation
    const form = reactive({
      title: '',
      description: '',
      category: '',
      level: '',
      duration: '',
      price: '',
      instructor: '',
      image: '',
      whatYouLearn: [''],
      requirements: [''],
      status: 'draft',
      processing: false,
      errors: new class {
        constructor() {
          this.errors = {};
        }
        
        has(field) {
          return this.errors.hasOwnProperty(field);
        }
        
        get(field) {
          if (this.errors[field]) {
            return this.errors[field][0];
          }
        }
        
        record(errors) {
          this.errors = errors;
        }
        
        clear(field) {
          if (field) {
            delete this.errors[field];
          } else {
            this.errors = {};
          }
        }
      }
    });

    // Initialize course object
    const course = reactive({
      title: '',
      description: '',
      category: '',
      level: '',
      duration: '',
      price: '',
      instructor: '',
      image: '',
      whatYouLearn: [''],
      requirements: [''],
      status: 'draft'
    });

    // Methods
    const addLearningItem = () => {
      course.whatYouLearn.push('');
    };

    const removeLearningItem = (index) => {
      if (course.whatYouLearn.length > 1) {
        course.whatYouLearn.splice(index, 1);
      }
    };

    const addRequirement = () => {
      course.requirements.push('');
    };

    const removeRequirement = (index) => {
      if (course.requirements.length > 1) {
        course.requirements.splice(index, 1);
      }
    };

    const submitCourse = async () => {
      form.processing = true;
      form.errors.clear();
      
      try {
        // Filter out empty values
        const filteredCourse = {
          ...course,
          whatYouLearn: course.whatYouLearn.filter(item => item.trim() !== ''),
          requirements: course.requirements.filter(item => item.trim() !== '')
        };
        
        const response = await apiClient.post('/courses', filteredCourse);
        
        console.log('Course added:', response.data);
        
        // Show success modal
        successMessage.value = 'Course has been successfully added!';
        const modal = new Modal(successModal.value);
        modal.show();
        
        // Reset form
        Object.assign(course, {
          title: '',
          description: '',
          category: '',
          level: '',
          duration: '',
          price: '',
          instructor: '',
          image: '',
          whatYouLearn: [''],
          requirements: [''],
          status: 'draft'
        });
        
      } catch (error) {
        console.error("Error adding course:", error);
        
        if (error.response && error.response.status === 422) {
          form.errors.record(error.response.data.errors);
        } else {
          successMessage.value = 'An error occurred while adding the course. Please try again.';
          const modal = new Modal(successModal.value);
          modal.show();
        }
      } finally {
        form.processing = false;
      }
    };

    const saveAsDraft = async () => {
      course.status = 'draft';
      await submitCourse();
    };

    onMounted(() => {
      // Initialize modal
      successModal.value = document.getElementById('successModal');
    });

    return {
      course,
      form,
      successModal,
      successMessage,
      addLearningItem,
      removeLearningItem,
      addRequirement,
      removeRequirement,
      submitCourse,
      saveAsDraft
    };
  }
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  border-bottom: none;
  padding: 1.25rem;
}

.form-label {
  font-weight: 500;
}

.form-control:focus, .form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn {
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 500;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-outline-danger:hover {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.input-group .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.img-thumbnail {
  border-radius: 6px;
}

/* Animations */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Custom styles for form groups */
.mb-4 {
  margin-bottom: 1.5rem !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }
  
  .d-flex.justify-content-between > div {
    width: 100%;
  }
  
  .d-flex.justify-content-between > div > button {
    width: 100%;
  }
}
</style>