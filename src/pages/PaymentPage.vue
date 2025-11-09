<template>
  <div class="payment-page">
    <!-- Page Header -->
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="page-title">Payment History</h1>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary" @click="refreshPayments">
            <i class="fas fa-sync-alt me-1"></i> Refresh
          </button>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paymentModal">
            <i class="fas fa-plus me-1"></i> Make Payment
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="row mb-4">
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="card summary-card total-card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i class="fas fa-dollar-sign fa-lg"></i>
                </div>
                <div>
                  <h6 class="text-muted mb-0">Total Amount</h6>
                  <h4 class="mb-0">${{ totalAmount.toFixed(2) }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="card summary-card paid-card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="icon-box bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i class="fas fa-check-circle fa-lg"></i>
                </div>
                <div>
                  <h6 class="text-muted mb-0">Paid Amount</h6>
                  <h4 class="mb-0">${{ paidAmount.toFixed(2) }}</h4>
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
                  <h6 class="text-muted mb-0">Pending Amount</h6>
                  <h4 class="mb-0">${{ pendingAmount.toFixed(2) }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="card summary-card progress-card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="icon-box bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i class="fas fa-percentage fa-lg"></i>
                </div>
                <div>
                  <h6 class="text-muted mb-0">Progress</h6>
                  <h4 class="mb-0">{{ paymentProgress }}%</h4>
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
                  placeholder="Search by transaction ID..."
                  v-model="searchQuery"
                >
              </div>
            </div>
            <div class="col-md-3">
              <select class="form-select" v-model="statusFilter">
                <option value="">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-select" v-model="sortBy">
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="status">Sort by Status</option>
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
        <p class="mt-2">Loading payment history...</p>
      </div>

      <!-- Payment History Table -->
      <div v-else class="card">
        <div class="card-header bg-white">
          <h5 class="mb-0">Payment Installments</h5>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>Installment No</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Paid Date</th>
                  <th>Status</th>
                  <th>Transaction ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="paymentInstallment in filteredPayments" :key="paymentInstallment.id">
                  <td>
                    <span class="fw-bold">#{{ paymentInstallment.installment_no }}</span>
                  </td>
                  <td>${{ paymentInstallment.amount }}</td>
                  <td>{{ paymentInstallment.due_date || 'N/A' }}</td>
                  <td>{{ paymentInstallment.paid_date || 'N/A' }}</td>
                  <td>
                    <span 
                      class="badge" 
                      :class="getStatusBadgeClass(paymentInstallment.status)"
                    >
                      {{ paymentInstallment.status }}
                    </span>
                  </td>
                  <td>
                    <span v-if="paymentInstallment.transaction_id">
                      {{ paymentInstallment.transaction_id }}
                    </span>
                    <span v-else class="text-muted">N/A</span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button 
                        v-if="paymentInstallment.status === 'pending' || paymentInstallment.status === 'overdue'"
                        class="btn btn-sm btn-primary"
                        data-bs-toggle="modal" 
                        data-bs-target="#paymentModal"
                        @click="selectInstallment(paymentInstallment)"
                      >
                        <i class="fas fa-credit-card me-1"></i> Pay
                      </button>
                      <button 
                        v-if="paymentInstallment.transaction_id"
                        class="btn btn-sm btn-outline-secondary"
                        @click="downloadReceipt(paymentInstallment)"
                      >
                        <i class="fas fa-download me-1"></i> Receipt
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- No Results -->
          <div v-if="filteredPayments.length === 0" class="text-center py-5">
            <i class="fas fa-receipt fa-3x text-muted mb-3"></i>
            <h5>No payment records found</h5>
            <p class="text-muted">Try adjusting your search or filters</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <div class="modal fade" id="paymentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <i class="fas fa-credit-card me-2"></i>
              Make Payment
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="pay()">
              <!-- Installment Info -->
              <div v-if="selectedInstallment" class="alert alert-info">
                <h6>Installment Details</h6>
                <div class="row">
                  <div class="col-6">
                    <strong>Installment No:</strong> #{{ selectedInstallment.installment_no }}
                  </div>
                  <div class="col-6">
                    <strong>Due Amount:</strong> ${{ selectedInstallment.amount }}
                  </div>
                </div>
              </div>
              
              <!-- Payment Method -->
              <div class="mb-3">
                <label for="paymentMethod" class="form-label">Payment Method</label>
                <select 
                  id="paymentMethod" 
                  class="form-select" 
                  v-model="payData.payment_method"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="mobile_banking">Mobile Banking</option>
                </select>
              </div>
              
              <!-- Amount -->
              <div class="mb-3">
                <label for="amount" class="form-label">Amount ($)</label>
                <input 
                  type="number" 
                  id="amount" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.amount }"
                  v-model="payData.amount" 
                  :max="selectedInstallment ? selectedInstallment.amount : 9999"
                  step="0.01"
                  required
                >
                <div v-if="errors.amount" class="invalid-feedback">
                  {{ errors.amount }}
                </div>
              </div>
              
              <!-- Transaction ID -->
              <div class="mb-3">
                <label for="transaction_id" class="form-label">Transaction ID</label>
                <input 
                  type="text" 
                  id="transaction_id" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.transaction_id }"
                  v-model="payData.transaction_id" 
                  placeholder="Enter transaction ID"
                  required
                >
                <div v-if="errors.transaction_id" class="invalid-feedback">
                  {{ errors.transaction_id }}
                </div>
              </div>
              
              <!-- Payment Date -->
              <div class="mb-3">
                <label for="payment_date" class="form-label">Payment Date</label>
                <input 
                  type="date" 
                  id="payment_date" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.payment_date }"
                  v-model="payData.payment_date"
                  :max="today"
                  required
                >
                <div v-if="errors.payment_date" class="invalid-feedback">
                  {{ errors.payment_date }}
                </div>
              </div>
              
              <!-- Notes -->
              <div class="mb-3">
                <label for="notes" class="form-label">Notes (Optional)</label>
                <textarea 
                  id="notes" 
                  class="form-control" 
                  v-model="payData.notes" 
                  rows="3"
                  placeholder="Add any additional notes about this payment"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              @click="pay()"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">
                <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Processing...
              </span>
              <span v-else>
                <i class="fas fa-credit-card me-1"></i>
                Submit Payment
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Payment Successful</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center py-4">
            <div class="mb-3">
              <i class="fas fa-check-circle fa-4x text-success"></i>
            </div>
            <h5>Payment Processed Successfully</h5>
            <p class="text-muted">Your payment has been processed and your payment history has been updated.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="downloadLastReceipt">
              <i class="fas fa-download me-1"></i> Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import DataService from "../services/DataService.js";

export default {
  name: "PaymentPage",
  setup() {
    // Data
    const payments = ref([]);
    const paymentInstallments = ref([]);
    const loading = ref(true);
    const isSubmitting = ref(false);
    const selectedInstallment = ref(null);
    const lastPaymentId = ref(null);
    
    // Filters
    const searchQuery = ref('');
    const statusFilter = ref('');
    const sortBy = ref('date');
    
    // Form data
    const payData = reactive({
      amount: 0,
      transaction_id: "",
      payment_method: "",
      payment_date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      notes: "",
      enrollment_id: null
    });
    
    // Form errors
    const errors = reactive({
      amount: "",
      transaction_id: "",
      payment_date: ""
    });
    
    // Computed properties
    const today = computed(() => new Date().toISOString().split('T')[0]);
    
    const totalAmount = computed(() => {
      return paymentInstallments.value.reduce((total, installment) => total + parseFloat(installment.amount || 0), 0);
    });
    
    const paidAmount = computed(() => {
      return paymentInstallments.value
        .filter(installment => installment.status === 'paid')
        .reduce((total, installment) => total + parseFloat(installment.amount || 0), 0);
    });
    
    const pendingAmount = computed(() => {
      return paymentInstallments.value
        .filter(installment => installment.status === 'pending' || installment.status === 'overdue')
        .reduce((total, installment) => total + parseFloat(installment.amount || 0), 0);
    });
    
    const paymentProgress = computed(() => {
      if (totalAmount.value === 0) return 0;
      return Math.round((paidAmount.value / totalAmount.value) * 100);
    });
    
    const filteredPayments = computed(() => {
      let result = [...paymentInstallments.value];
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(payment => 
          payment.transaction_id?.toLowerCase().includes(query) ||
          payment.installment_no.toString().includes(query)
        );
      }
      
      // Apply status filter
      if (statusFilter.value) {
        result = result.filter(payment => payment.status === statusFilter.value);
      }
      
      // Apply sorting
      switch (sortBy.value) {
        case 'amount':
          result.sort((a, b) => parseFloat(b.amount || 0) - parseFloat(a.amount || 0));
          break;
        case 'status':
          result.sort((a, b) => a.status.localeCompare(b.status));
          break;
        case 'date':
        default:
          result.sort((a, b) => {
            const dateA = new Date(a.paid_date || a.due_date || '0');
            const dateB = new Date(b.paid_date || b.due_date || '0');
            return dateB - dateA;
          });
          break;
      }
      
      return result;
    });
    
    // Methods
    const getPayments = async () => {
      loading.value = true;
      try {
        const enrollment_id = window.location.pathname.split('/').pop();
        payData.enrollment_id = enrollment_id;
        
        const res = await DataService.getPayments(enrollment_id);
        payments.value = res.data;
        paymentInstallments.value = res.data.payment_installments || [];
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        loading.value = false;
      }
    };
    
    const refreshPayments = () => {
      getPayments();
    };
    
    const resetFilters = () => {
      searchQuery.value = '';
      statusFilter.value = '';
      sortBy.value = 'date';
    };
    
    const getStatusBadgeClass = (status) => {
      switch (status) {
        case 'paid':
          return 'bg-success';
        case 'pending':
          return 'bg-warning';
        case 'overdue':
          return 'bg-danger';
        default:
          return 'bg-secondary';
      }
    };
    
    const selectInstallment = (installment) => {
      selectedInstallment.value = installment;
      payData.amount = installment.amount;
    };
    
    const validateForm = () => {
      // Reset errors
      Object.keys(errors).forEach(key => errors[key] = '');
      let isValid = true;
      
      // Amount validation
      if (!payData.amount || payData.amount <= 0) {
        errors.amount = 'Amount is required and must be greater than 0';
        isValid = false;
      } else if (selectedInstallment.value && parseFloat(payData.amount) > parseFloat(selectedInstallment.value.amount)) {
        errors.amount = `Amount cannot exceed the due amount of $${selectedInstallment.value.amount}`;
        isValid = false;
      }
      
      // Transaction ID validation
      if (!payData.transaction_id.trim()) {
        errors.transaction_id = 'Transaction ID is required';
        isValid = false;
      }
      
      // Payment date validation
      if (!payData.payment_date) {
        errors.payment_date = 'Payment date is required';
        isValid = false;
      } else if (payData.payment_date > today.value) {
        errors.payment_date = 'Payment date cannot be in the future';
        isValid = false;
      }
      
      return isValid;
    };
    
    const pay = async () => {
      if (!validateForm()) return;
      
      isSubmitting.value = true;
      
      try {
        const res = await DataService.pay(payData);
        
        if (res.status === 200) {
          lastPaymentId.value = res.data.payment_id;
          
          // Show success modal
          const successModal = new bootstrap.Modal(document.getElementById('successModal'));
          successModal.show();
          
          // Close payment modal
          const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
          paymentModal.hide();
          
          // Reset form
          Object.assign(payData, {
            amount: 0,
            transaction_id: "",
            payment_method: "",
            payment_date: today.value,
            notes: "",
            enrollment_id: payData.enrollment_id
          });
          selectedInstallment.value = null;
          
          // Refresh payment data
          await getPayments();
        } else {
          alert(res.data.message || 'Payment failed. Please try again.');
        }
      } catch (error) {
        console.error("Payment error:", error);
        alert('An error occurred while processing your payment. Please try again.');
      } finally {
        isSubmitting.value = false;
      }
    };
    
    const downloadReceipt = (payment) => {
      // In a real app, this would generate and download a PDF receipt
      console.log('Downloading receipt for payment:', payment);
      alert('Receipt download feature would be implemented here');
    };
    
    const downloadLastReceipt = () => {
      if (lastPaymentId.value) {
        // In a real app, this would generate and download a PDF receipt for the last payment
        console.log('Downloading receipt for payment ID:', lastPaymentId.value);
        alert('Receipt download feature would be implemented here');
      }
    };
    
    // Lifecycle
    onMounted(() => {
      getPayments();
    });
    
    return {
      payments,
      paymentInstallments,
      loading,
      isSubmitting,
      selectedInstallment,
      searchQuery,
      statusFilter,
      sortBy,
      payData,
      errors,
      today,
      totalAmount,
      paidAmount,
      pendingAmount,
      paymentProgress,
      filteredPayments,
      refreshPayments,
      resetFilters,
      getStatusBadgeClass,
      selectInstallment,
      pay,
      downloadReceipt,
      downloadLastReceipt
    };
  }
};
</script>

<style scoped>
.payment-page {
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

.modal-header {
  border-bottom: none;
}

.modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
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
}
</style>