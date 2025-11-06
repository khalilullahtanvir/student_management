// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// --- Admin Components ---
import AdminDashboard from '@/pages/admin/AdminDashboard.vue'
import CoursesManage from '@/pages/admin/CoursesManage.vue'
import AddCoursePage from '@/pages/admin/AddCoursePage.vue'

// --- User Pages ---
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import CoursesPage from '@/pages/CoursesPage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import EnrollmentsPage from '@/pages/EnrollmentsPage.vue'
import PaymentPage from '@/pages/PaymentPage.vue'
import PaymentHistory from '@/pages/PaymentHistory.vue'
import MyEnrollmentsPage from '@/pages/MyEnrollmentsPage.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  // --- Public Routes ---
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/courses', name: 'Courses', component: CoursesPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },

  // ✅ My Enrollments (তুমি path নামটা ভুল করেছিলে)
  {
    path: '/my-enrollments',
    name: 'MyEnrollments',
    component: MyEnrollmentsPage,
    meta: { requiresAuth: true }
  },

  // --- Admin Routes ---
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/courses',
    name: 'CoursesManage',
    component: CoursesManage,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/courses/create',
    name: 'AddCourse',
    component: AddCoursePage,
    meta: { requiresAuth: true }
  },

  // --- User Routes ---
  {
    path: '/enrollments',
    name: 'Enrollments',
    component: EnrollmentsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: PaymentPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/payment-history',
    name: 'PaymentHistory',
    component: PaymentHistory,
    meta: { requiresAuth: true }
  },

  // --- 404 ---
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// --- Navigation Guard (token check) ---
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('auth_token') // ⚠️ এখানে token নামটা তোমার localStorage অনুযায়ী ঠিক করা হলো

  if (requiresAuth && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
