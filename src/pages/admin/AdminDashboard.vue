<template>
  <div class="container py-5">
    <h2 class="mb-4">Admin Dashboard</h2>
    <div class="row text-center">
      <div class="col-md-3" v-for="item in stats" :key="item.label">
        <div class="card shadow-sm p-3 mb-4">
          <h4>{{ item.value }}</h4>
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      stats: []
    }
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/dashboard', { withCredentials: true })
      this.stats = [
        { label: 'Students', value: res.data.students },
        { label: 'Courses', value: res.data.courses },
        { label: 'Payments', value: res.data.payments },
        { label: 'Enrollments', value: res.data.enrollments },
      ]
    } catch (err) {
      console.error('Error fetching dashboard data', err)
    }
  }
}
</script>
