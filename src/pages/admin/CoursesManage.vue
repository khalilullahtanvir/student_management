<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Manage Courses</h2>
      <router-link to="/admin/courses/create" class="btn btn-primary">Add New Course</router-link>
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status"></div>
    </div>

    <table v-else class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Level</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses.data" :key="course.id">
          <td>{{ course.title }}</td>
          <td>${{ course.price }}</td>
          <td>{{ course.level }}</td>
          <td>
            <router-link :to="`/admin/courses/${course.id}/edit`" class="btn btn-sm btn-warning me-2">Edit</router-link>
            <button @click="deleteCourse(course.id)" class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api';

const router = useRouter();
const courses = ref([]);
const loading = ref(true);

const fetchCourses = async () => {
  try {
    const response = await apiClient.get('/admin/courses');
    courses.value = response.data;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  } finally {
    loading.value = false;
  }
};

const deleteCourse = async (id) => {
  if (!confirm('Are you sure you want to delete this course?')) {
    return;
  }
  try {
    await apiClient.delete(`/admin/courses/${id}`);
    // ডিলিট হওয়ার পর লিস্ট থেকে সরিয়ে ফেলা হবে
    courses.value.data = courses.value.data.filter(course => course.id !== id);
  } catch (error) {
    console.error('Failed to delete course:', error);
  }
};

onMounted(() => {
  fetchCourses();
});
</script>