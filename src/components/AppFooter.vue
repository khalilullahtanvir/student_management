<template>
  <footer class="bg-dark text-white text-center py-4 mt-5">
    <div class="container">
      <p class="mb-0">&copy; 2025 Edukate. All Rights Reserved.</p>
      
    </div>
  </footer>
  
</template>
<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api' // আপনার নতুন apiClient ইম্পোর্ট করুন

const courses = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    // আর হেডারে ম্যানুয়ালি টোকেন দেওয়া লাগবে না!
    const res = await apiClient.get('/api/courses') 
    courses.value = res.data
  } catch (error) {
    console.error('Error fetching courses:', error)
  } finally {
    loading.value = false
  }
})
</script>