// src/api/index.js

import axios from "axios";

// একটি নতুন axios instance তৈরি করুন
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // আপনার Laravel API এর ঠিকানা
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request Interceptor: প্রতিটি রিকোয়েস্টের আগে টোকেন যোগ করবে
apiClient.interceptors.request.use(
    (config) => {
        // localStorage থেকে টোকেন নিন
        const token = localStorage.getItem('token');
        
        // যদি টোকেন থাকে, তাহলে হেডারে যোগ করুন
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // রিকোয়েস্টে এরর হলে
        return Promise.reject(error);
    }
);

// Response Interceptor: যদি রেসপন্সে 401 এরর আসে (টোকেন এক্সপায়ার্ড)
apiClient.interceptors.response.use(
    (response) => response, // সফল রেসপন্স
    (error) => {
        // যদি এরর হয় এবং স্ট্যাটাস 401 (Unauthenticated) হয়
        if (error.response && error.response.status === 401) {
            console.error('Token expired or invalid. Please log in again.');
            localStorage.removeItem('token'); // অবৈধ টোকেন মুছে ফেলুন
            // ইউজারকে লগইন পেজে পাঠিয়ে দিন
            // এটি কাজ করার জন্য আপনাকে ভিউ রাউটার এখানে ইম্পোর্ট করতে হতে পারে
            // router.push('/login'); 
            window.location.href = '/login'; // সহজ উপায়
        }
        return Promise.reject(error);
    }
);

// কনফিগার করা axios instance টি এক্সপোর্ট করুন
export default apiClient;