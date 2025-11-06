import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import CoursesPage from '@/pages/CoursesPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import NotFound from '../pages/NotFound.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import AddCoursePage from '../pages/AddCoursePage.vue';
import EnrollmentPage from '../pages/EnrollmentPage.vue';
import PaymentPage from '../pages/PaymentPage.vue';
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/courses', name: 'Courses', component: CoursesPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  {
    path: '/courses/create',
    name: 'add-course',
    component: AddCoursePage
  },
  {
    path: '/enrollment',
    name: 'Enrollment',
    component: EnrollmentPage
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: PaymentPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
