<template>
  <div class="enrollment-page">
    <!-- Page Header -->
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="page-title">My Enrollments</h1>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary" @click="refreshEnrollments">
            <i class="fas fa-sync-alt me-1"></i> Refresh
          </button>
          <router-link to="/courses" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i> Browse Courses
          </router-link>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="row mb-4">
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="card summary-card total-card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i class="fas fa-book fa-lg"></i>
                </div>
                <div>
                  <h6 class="text-muted mb-0">Total Enrollments</h6>
                  <h4 class="mb-0">{{ enrollments.length }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="card summary-card completed-card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="icon-box bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i class="fas fa-check-circle fa-lg"></i>
                </div>
                <div>
                  <h6 class="text-muted mb-0">Completed</h6>
                  <h4 class="mb-0">{{ completedEnrollments }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="card summary-card pending-card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="icon-box bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i class="fas fa-clock fa-lg"></i>
                </div>
                <div>
                  <h6 class="text-muted mb-0">In Progress</h6>
                  <h4 class="mb-0">{{ inProgressEnrollments }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="card summary-card amount-card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="icon-box bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i class="fas fa-dollar-sign fa-lg"></i>
                </div>
                <div>
                  <h6 class="text-muted mb-0">Total Spent</h6>
                  <h4 class="mb-0">${{ totalSpent.toFixed(2) }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="fas fa-search"></i>
                </span>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search by course title..."
                  v-model="searchQuery"
                >
              </div>
            </div>
            <div class="col-md-3">
              <select class="form-select" v-model="statusFilter">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-select" v-model="paymentFilter">
                <option value="">All Payment Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
              </select>
            </div>
            <div class="col-md-2">
              <button class="btn btn-outline-secondary w-100" @click="resetFilters">
                <i class="fas fa-redo me-1"></i> Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading enrollments...</p>
      </div>

      <!-- No Results -->
      <div v-else-if="filteredEnrollments.length === 0" class="text-center py-5">
        <i class="fas fa-graduation-cap fa-3x text-muted mb-3"></i>
        <h4>No enrollments found</h4>
        <p class="text-muted">Try adjusting your search or filters</p>
        <router-link to="/courses" class="btn btn-primary">
          <i class="fas fa-plus me-1"></i> Browse Courses
        </router-link>
      </div>

      <!-- Enrollments Table -->
      <div v-else class="card">
        <div class="card-header bg-white">
          <h5 class="mb-0">Your Enrollments</h5>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Paid Amount</th>
                  <th>Remaining Amount</th>
                  <th>Enroll Date</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="enrollment in filteredEnrollments" :key="enrollment.id">
                  <td>
                    <div class="d-flex align-items-center">
                      <img 
                        :src="enrollment.course.image || 'https://picsum.photos/seed/course' + enrollment.id + '/50/50.jpg'" 
                        :alt="enrollment.course.title" 
                        class="rounded me-3"
                        width="40"
                        height="40"
                      >
                      <div>
                        <h6 class="mb-0">{{ enrollment.course.title }}</h6>
                        <small class="text-muted">{{ enrollment.course.instructor || 'Staff' }}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span 
                      class="badge" 
                      :class="getStatusBadgeClass(enrollment.status)"
                    >
                      {{ enrollment.status }}
                    </span>
                  </td>
                  <td>${{ enrollment.course.price }}</td>
                  <td>${{ enrollment.payment?.amount || 0 }}</td>
                  <td>
                    <span class="fw-bold" :class="getRemainingAmountClass(enrollment)">
                      ${{ getRemainingAmount(enrollment) }}
                    </span>
                  </td>
                  <td>{{ formatDate(enrollment.enroll_date) }}</td>
                  <td>
                    <span 
                      class="badge" 
                      :class="getPaymentStatusBadgeClass(enrollment.payment?.status)"
                    >
                      {{ enrollment.payment?.status || 'N/A' }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <router-link 
                        :to="`/courses/${enrollment.course.id}`" 
                        class="btn btn-sm btn-outline-primary"
                        title="View Course"
                      >
                        <i class="fas fa-eye"></i>
                      </router-link>
                      <router-link 
                        :to="`/payment/${enrollment.id}`" 
                        class="btn btn-sm btn-primary"
                        title="Make Payment"
                        v-if="getRemainingAmount(enrollment) > 0"
                      >
                        <i class="fas fa-credit-card"></i>
                      </router-link>
                      <router-link 
                        :to="`/invoice/${enrollment.id}`" 
                        class="btn btn-sm btn-outline-secondary"
                        title="View Invoice"
                        v-if="enrollment.payment"
                      >
                        <i class="fas fa-file-invoice"></i>
                      </router-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import DataService from "../services/DataService.js";

export default {
  name: "EnrollmentPage",
  setup() {
    // Data
    const enrollments = ref([]);
    const loading = ref(true);
    
    // Filters
    const searchQuery = ref('');
    const statusFilter = ref('');
    const paymentFilter = ref('');
    
    // Computed properties
    const filteredEnrollments = computed(() => {
      let result = [...enrollments.value];
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(enrollment => 
          enrollment.course.title.toLowerCase().includes(query)
        );
      }
      
      // Apply status filter
      if (statusFilter.value) {
        result = result.filter(enrollment => enrollment.status === statusFilter.value);
      }
      
      // Apply payment filter
      if (paymentFilter.value) {
        result = result.filter(enrollment => 
          enrollment.payment?.status === paymentFilter.value
        );
      }
      
      return result;
    });
    
    const completedEnrollments = computed(() => {
      return enrollments.value.filter(enrollment => enrollment.status === 'completed').length;
    });
    
    const inProgressEnrollments = computed(() => {
      return enrollments.value.filter(enrollment => enrollment.status === 'in_progress').length;
    });
    
    const totalSpent = computed(() => {
      return enrollments.value.reduce((total, enrollment) => {
        return total + parseFloat(enrollment.payment?.amount || 0);
      }, 0);
    });
    
    // Methods
    const getEnrollments = async () => {
      loading.value = true;
      try {
        const res = await DataService.getEnrollments();
        enrollments.value = res.data || [];
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        loading.value = false;
      }
    };
    
    const refreshEnrollments = () => {
      getEnrollments();
    };
    
    const resetFilters = () => {
      searchQuery.value = '';
      statusFilter.value = '';
      paymentFilter.value = '';
    };
    
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
    
    const getRemainingAmount = (enrollment) => {
      const price = parseFloat(enrollment.course.price || 0);
      const paid = parseFloat(enrollment.payment?.amount || 0);
      return price - paid;
    };
    
    const getRemainingAmountClass = (enrollment) => {
      const remaining = getRemainingAmount(enrollment);
      if (remaining <= 0) return 'text-success';
      if (remaining < parseFloat(enrollment.course.price) * 0.5) return 'text-warning';
      return 'text-danger';
    };
    
    const getStatusBadgeClass = (status) => {
      switch (status) {
        case 'completed':
          return 'bg-success';
        case 'in_progress':
          return 'bg-info';
        case 'pending':
          return 'bg-warning';
        default:
          return 'bg-secondary';
      }
    };
    
    const getPaymentStatusBadgeClass = (status) => {
      switch (status) {
        case 'paid':
          return 'bg-success';
        case 'partial':
          return 'bg-warning';
        case 'pending':
          return 'bg-danger';
        default:
          return 'bg-secondary';
      }
    };
    
    // Lifecycle
    onMounted(() => {
      getEnrollments();
    });
    
    return {
      enrollments,
      loading,
      searchQuery,
      statusFilter,
      paymentFilter,
      filteredEnrollments,
      completedEnrollments,
      inProgressEnrollments,
      totalSpent,
      refreshEnrollments,
      resetFilters,
      formatDate,
      getRemainingAmount,
      getRemainingAmountClass,
      getStatusBadgeClass,
      getPaymentStatusBadgeClass
    };
  }
};
</script>

<style scoped>
.enrollment-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.page-title {
  color: #333;
  font-weight: 600;
}

.summary-card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.icon-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table th {
  font-weight: 600;
  border-top: none;
  background-color: #f8f9fa;
}

.table td {
  vertical-align: middle;
}

.badge {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}

.btn-group .btn {
  margin-right: 0.25rem;
}

.btn-group .btn:last-child {
  margin-right: 0;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.form-control:focus, .form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }
  
  .d-flex.gap-2 {
    width: 100%;
    justify-content: flex-end;
  }
  
  .table-responsive {
    font-size: 0.875rem;
  }
  
  .btn-group {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .btn-group .btn {
    margin-right: 0;
  }
}
</style>