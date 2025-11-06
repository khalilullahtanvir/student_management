<template>
  <div class="container py-5">
    <h2 class="mb-4">Available Courses</h2>

    <div class="row">
      <div
        v-for="course in courses"
        :key="course.id"
        class="col-md-4 mb-4"
      >
        <div class="card shadow-sm p-3">
          <h5>{{ course.title }}</h5>
          <p>{{ course.description.substring(0, 80) }}...</p>
          <p><strong>Duration:</strong> {{ course.duration }}</p>
          <p><strong>Price:</strong> ${{ course.price }}</p>
          <button class="btn btn-success w-100" @click="enroll(course.id)">
            Enroll Now
          </button>
        </div>
      </div>
    </div>

    <div v-if="message" class="alert alert-info mt-4">{{ message }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      courses: [],
      message: "",
    };
  },
  async created() {
    const res = await axios.get("http://127.0.0.1:8000/api/courses");
    this.courses = res.data;
  },
  methods: {
    async enroll(courseId) {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        this.message = "Please login first!";
        this.$router.push("/login");
        return;
      }

      try {
        await axios.post(
          "http://127.0.0.1:8000/api/enrollments",
          { course_id: courseId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.message = "✅ Enrolled successfully!";
      } catch (error) {
        if (error.response?.status === 409) {
          this.message = "⚠️ You are already enrolled in this course.";
        } else {
          this.message = "❌ Enrollment failed.";
        }
      }
    },
  },
};
</script>
