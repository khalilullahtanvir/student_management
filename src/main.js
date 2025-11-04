import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

const app = createApp(App);

// Axios এর জন্য ডিফল্ট কনফিগারেশন সেট করুন
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

const token = localStorage.getItem('auth_token');

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


// ✅ Bootstrap & Theme CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@/assets/css/style.css'
app.use(router)
app.mount('#app')
