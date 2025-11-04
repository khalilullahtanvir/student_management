<!-- src/pages/AddCoursePage.vue -->
<template>
  <div class="container">
    <h1>Add New Course</h1>
    <form @submit.prevent="submitCourse">
      <div class="form-group">
        <label for="title">Course Title</label>
        <input type="text" id="title" v-model="course.title" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="course.description"></textarea>
      </div>
      <!-- অন্যান্য ফিল্ড যোগ করতে পারেন -->
      <button type="submit">Add Course</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      course: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    async submitCourse() {
      try {
        // ফর্মের ডাটা Laravel API তে পাঠানো হচ্ছে
        const response = await axios.post('http://127.0.0.1:8000/api/courses', this.course);
        
        console.log('Course added:', response.data);
        
        // কোর্স যোগ হয়ে গেলে কোর্স লিস্ট পেজে নিয়ে যান
        this.$router.push('/courses'); 

      } catch (error) {
        console.error("Error adding course:", error.response.data);
      }
    }
  }
};
</script>

<style scoped>
.container { max-width: 600px; margin: auto; padding: 20px; }
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; }
input, textarea { width: 100%; padding: 8px; box-sizing: border-box; }
button { padding: 10px 15px; background-color: #007bff; color: white; border: none; cursor: pointer; }
</style>