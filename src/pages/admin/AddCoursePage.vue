<template>
  <section class="container py-5">
    <h2 class="text-center mb-5">Add New Course</h2>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <form @submit.prevent="submitCourse">
          <!-- Title -->
          <div class="mb-3">
            <label for="title" class="form-label">Course Title</label>
            <input type="text" class="form-control" id="title" v-model="course.title" required>
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" rows="4" v-model="course.description" required></textarea>
          </div>

          <div class="row">
            <!-- Price -->
            <div class="col-md-6 mb-3">
              <label for="price" class="form-label">Price ($)</label>
              <input type="number" class="form-control" id="price" v-model="course.price" step="0.01" required>
            </div>

            <!-- Duration -->
            <div class="col-md-6 mb-3">
              <label for="duration" class="form-label">Duration</label>
              <input type="text" class="form-control" id="duration" v-model="course.duration" placeholder="e.g., 3 Months" required>
            </div>
          </div>

          <!-- Level -->
          <div class="mb-3">
            <label for="level" class="form-label">Level</label>
            <select class="form-select" id="level" v-model="course.level" required>
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <!-- Image -->
          <div class="mb-3">
            <label for="image" class="form-label">Course Image</label>
            <input type="file" class="form-control" id="image" @change="onFileChange" accept="image/*" required>
            <!-- ছবির প্রিভিউ -->
            <div v-if="imagePreview" class="mt-3">
              <img :src="imagePreview" alt="Image Preview" class="img-thumbnail" style="max-height: 200px;">
            </div>
          </div>

          <!-- Submit Button -->
          <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
              {{ isSubmitting ? 'Adding Course...' : 'Add Course' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api'

const router = useRouter()

// ফর্মের ডেটা রাখার জন্য reactive object
const course = reactive({
  title: '',
  description: '',
  price: '',
  duration: '',
  level: '',
  image: null // ছবির ফাইল রাখার জন্য
})

const imagePreview = ref(null)
const isSubmitting = ref(false)

// ছবি সিলেক্ট করলে প্রিভিউ দেখানোর জন্য
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    course.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

// ফর্ম সাবমিট করার ফাংশন
// AddCoursePage.vue - <script setup> এর ভেতরের অংশ

// ... অন্যান্য কোড ...

const submitCourse = async () => {
  isSubmitting.value = true
  try {
    const formData = new FormData()
    formData.append('title', course.value.title)
    formData.append('description', course.value.description)
    formData.append('price', course.value.price)
    formData.append('duration', course.value.duration)
    formData.append('level', course.value.level)
    formData.append('image', course.value.image)

    // এখান অ্যাডমিন এন্ডপয়েন্টে পাঠানো হচ্ছে
    await apiClient.post('/admin/courses', formData) 
    
    router.push('/admin/courses');
  } catch (error) {
    console.error('Error creating course:', error.response?.data || error);
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* আপনার স্টাইল এখানে থাকতে পারে */
</style>