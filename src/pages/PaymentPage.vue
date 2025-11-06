<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Make Payment</h2>

    <div class="card p-4 shadow">
      <form @submit.prevent="makePayment">
        <div class="mb-3">
          <label class="form-label">Amount</label>
          <input v-model="amount" type="number" class="form-control" placeholder="Enter amount" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Pay Now</button>
      </form>
    </div>

    <div v-if="message" class="alert alert-success mt-4">{{ message }}</div>
  </div>
</template>

<script>
import axios from "@/api";

export default {
  data() {
    return {
      amount: "",
      message: "",
    };
  },
  methods: {
    async makePayment() {
      const token = localStorage.getItem("token");
      const enrollmentId = this.$route.params.id;

      const res = await axios.post(
        "/api/payments",
        { enrollment_id: enrollmentId, amount: this.amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.message = res.data.message;
    },
  },
};
</script>
