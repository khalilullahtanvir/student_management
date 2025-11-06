<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Payment History</h2>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Course</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.enrollment.course.title }}</td>
          <td>${{ payment.amount }}</td>
          <td>{{ payment.status }}</td>
          <td>{{ payment.payment_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "@/api";

export default {
  data() {
    return { payments: [] };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/payments/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.payments = res.data;
  },
};
</script>
