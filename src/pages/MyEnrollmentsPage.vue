<template>
  <div class="container py-5">
    <h2>My Enrolled Courses</h2>
    <ul class="list-group mt-4">
      <li
        v-for="enroll in enrollments"
        :key="enroll.id"
        class="list-group-item"
      >
        {{ enroll.course.title }} — <span class="text-success">{{ enroll.status }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { enrollments: [] };
  },
  async created() {
    const token = localStorage.getItem("auth_token");
    const res = await axios.get("http://127.0.0.1:8000/api/my-enrollments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.enrollments = res.data;
  },
};
</script>
