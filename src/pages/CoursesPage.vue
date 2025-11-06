<template>
  <section class="container py-5">
    <h2 class="text-center mb-5">Available Courses</h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3">Loading courses...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && courses.length === 0" class="text-center py-5">
      <i class="fa fa-folder-open fa-3x text-muted mb-3"></i>
      <h4 class="text-muted">No Courses Available</h4>
      <p class="text-muted">Please check back later!</p>
    </div>

    <!-- Course List -->
    <div v-else class="row">
      <div
        v-for="course in courses"
        :key="course.id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="course.image_path ? `/storage/${course.image_path}` : `https://picsum.photos/seed/${course.id}/400/250.jpg`"
            class="card-img-top"
            :alt="course.title"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ course.title }}</h5>
            <p class="card-text flex-grow-1">{{ course.description.substring(0, 80) }}...</p>
            <div class="mt-auto">
              <p><strong>Duration:</strong> {{ course.duration }}</p>
              <p><strong>Price:</strong> <span class="text-primary">${{ course.price }}</span></p>
              <button class="btn btn-success w-100" @click="enroll(course.id)">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Message -->
    <div v-if="message.text" class="position-fixed top-0 end-0 p-3" style="z-index: 1050;">
      <div :class="`alert alert-${message.type} alert-dismissible fade show` role="alert">
        {{ message.text }}
        <button type="button" class="btn-close" @click="clearMessage"></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api'; // 🔴 সরাসরি axios এর পরিবর্তে apiClient ব্যবহার করুন

const router = useRouter();
const courses = ref([]);
const loading = ref(true);
const message = ref({ text: '', type: 'info' }); // 🔴 মেসেজ অবজেক্ট হিসেবে নিন

// কোর্সের তালিকা আনার ফাংশন
const fetchCourses = async () => {
  try {
    loading.value = true;
    // 🔴 baseURL থাকে শুধুমাত্র '/courses' লিখুন
    const response = await apiClient.get('/courses');
    courses.value = response.data.data; // প্যাগিনেশন থাকলে response.data হবে
  } catch (error) {
    console.error('Error fetching courses:', error);
    showMessage('Failed to load courses.', 'danger');
  } finally {
    loading.value = false;
  }
};

// এনরোলমেন্ট ফাংশন
const enroll = async (courseId) => {
  // 🔴 localStorage থেকে 'token' নামে টোকেন নিন
  const token = localStorage.getItem('token');
  if (!token) {
    showMessage('Please login first to enroll!', 'warning');
    // একটু সময়ক্ষেজ পরে লগইন পেজে নিয�ে যাওয়ার জন্য একটি বিলম্বি দেখানো যেতে পারে
    setTimeout(() => {
      router.push('/login');
    }, 1500);
    return;
  }

  try {
    // 🔴 apiClient ব্যবহার করুন, এটি স্বয়ংক্রিয়ভাবে টোকেন হেডারে যোগ করবে
    await apiClient.post('/enrollments', { course_id: courseId });
    showMessage('✅ Enrolled successfully!', 'success');
  } catch (error) {
    if (error.response && error.response.status === 409) {
      showMessage('⚠️ You are already enrolled in this course.', 'warning');
    } else {
      console.error('Enrollment failed:', error);
      showMessage('❌ Enrollment failed. Please try again.', 'danger');
    }
  }
};

// মেসেজ দেখানোর এবং লুকানোর ফাংশন
const showMessage = (text, type = 'info') => {
  message.value = { text, type };
  // ৫ সেকেন্ড পরে মেসেজ অটোমেটিক ভাবে যাবে
  setTimeout(() => {
    clearMessage();
  }, 5000);
};

const clearMessage = () => {
  message.value = { text: '', type: 'info' };
};

// কম্পোনেন্ট মাউন্ট হলে কোর্সের তালিকা আনুন
onMounted(() => {
  fetchCourses();
});
</script>

<style scoped>
/* আপনার স্টাইল এখানে থাকতে পারে */
</style>