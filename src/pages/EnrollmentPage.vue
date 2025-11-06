<template>
    <div class="container">
        <h1>Enrollment</h1>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Paid Amount</th>
                    <th>Remaining Amount</th>
                    <th>Enroll Date</th>
                    <th>Payment Status</th>
                    <th>Payment History</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="enrollment in enrollments" :key="enrollment.id">
                    <td>{{ enrollment.course.title }}</td>
                    <td>{{ enrollment.status }}</td>
                    <td>{{ enrollment.course.price }}</td>
                    <td>{{ enrollment.payment?.amount }}</td>
                    <td>{{ enrollment.course.price - enrollment.payment?.amount }}</td>
                    <td>{{ enrollment.enroll_date }}</td>
                    <td>{{ enrollment.payment?.status }}</td>
                    <td><router-link :to="`/payment/${enrollment.id}`" class="btn btn-primary">Pay</router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DataService from "../services/DataService.js";
export default {
    name: "EnrollmentPage",
    data() {
        return {
            remainingAmount: 0,
            enrollments: [],
        };
    },
    async mounted() {
        const res = await DataService.getEnrollments();
        this.enrollments = res.data;
    },
    methods: {
    }
};
</script>