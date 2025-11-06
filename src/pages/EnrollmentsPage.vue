<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">My Enrollments</h2>

    <div v-if="!enrollments.length" class="text-center">
      <p>No enrollments found.</p>
    </div>

    <div v-for="enroll in enrollments" :key="enroll.id" class="card p-3 mb-3 shadow-sm">
      <h5>{{ enroll.course.title }}</h5>
      <p>Status: {{ enroll.status }}</p>
      <button class="btn btn-success" @click="goToPayment(enroll.id)">Pay Now</button>
    </div>
  </div>
</template>

<script>
import axios from "@/api";

export default {
  data() {
    return { enrollments: [] };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/my-enrollments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.enrollments = res.data;
  },
  methods: {
    goToPayment(enrollmentId) {
      this.$router.push(`/payment/${enrollmentId}`);
    },
  },
};
</script>
