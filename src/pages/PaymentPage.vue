<template>
    <div class="container">
        <h1>Payment History</h1>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Installment No</th>
                    <th>Amount</th>
                    <th>Paid Date</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                </tr>
            </thead>
            <tbody>
                
                <tr v-for="paymentInstallment in paymentInstallments" :key="paymentInstallment.id">
                    <td>{{ paymentInstallment.installment_no }}</td>
                    <td>{{ paymentInstallment.amount }}</td>
                    <td>{{ paymentInstallment.paid_date }}</td>
                    <td>{{ paymentInstallment.status }}</td>
                    <td>{{ paymentInstallment.transaction_id }}</td>
                </tr>
                <tr>
                    <td colspan="5">
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paymentModal">Pay</button>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="modal" id="paymentModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Payment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="pay()">
                        <div class="form-group">
                            <label for="amount">Amount</label>
                            <input type="number" class="form-control" id="amount" v-model="payData.amount" required>
                        </div>
                        <div class="form-group">
                            <label for="transaction_id">Transaction ID</label>
                            <input type="text" class="form-control" id="transaction_id" v-model="payData.transaction_id" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" @click="pay()">Pay</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from "../services/DataService.js";
export default {
    name: "PaymentPage",
    data() {
        return {
            payments: [],
            paymentInstallments: [],
            payData: {
                amount: 0,
                transaction_id: "",
                enrollment_id:this.$route.params.id
            },
        };
    },
    async mounted() {
        let enrollment_id = this.$route.params.id;
        const res = await DataService.getPayments(enrollment_id);
        this.payments = res.data;
        this.paymentInstallments = res.data.payment_installments;
        
    },
    methods: {
        async getPaymentInstallments(enrollment_id) {
            const res = await DataService.getPaymentInstallments(enrollment_id);
            this.paymentInstallments = res.data;
        },
        async pay() {
            const res = await DataService.pay(this.payData);
           
            if (res.status === 200) {
                window.location.href = '/enrollment';
            } else {
                alert(res.data.message);
            }
        },
    },
};
</script>