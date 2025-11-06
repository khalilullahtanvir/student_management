<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">All Courses</h2>

    <div class="row">
      <div v-for="course in courses" :key="course.id" class="col-md-4 mb-4">
        <div class="card shadow p-3">
          <h4>{{ course.title }}</h4>
          <p>{{ course.description.substring(0, 100) }}...</p>
          <p><strong>Duration:</strong> {{ course.duration }}</p>
          <p><strong>Price:</strong> ${{ course.price }}</p>
          <button class="btn btn-primary" @click="enroll(course.id)">Enroll Now</button>
        </div>
      </div>
    </div>

    <div v-if="message" class="alert alert-success mt-4">{{ message }}</div>
  </div>
</template>

  <script>
  import DataService from "../services/DataService.js";

export default {
  name: "CoursesPage",
  data() {
    return {
      courses: [],
      message: "",
    };
  },
  async mounted() {
    try {
      const res = await DataService.getCourses(); 
      this.courses = res.data.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      // যদি 401 এরর আসে, ইন্টারসেপ্টর আপনাকে লগইন পেজে নিয়ে যাবে
    }
  },
  methods: {
    async enroll(courseId) {
      try {
        // সমাধান: শুধু '/enrollments' লিখুন এবং টোকেন হ্যান্ডলিং মুছে দিন
        // ইন্টারসেপ্টর স্বয়ংক্রিয়ভাবে টোকেন যুক্ত করবে
        const res = await DataService.enroll(courseId);
        this.message = res.data.message;
      } catch (err) {
        console.error("Enrollment error:", err);
        // যদি 401 এরর আসে, ইন্টারসেপ্টর আপনাকে লগইন পেজে নিয়ে যাবে
      }
    },
  },
};
</script>
