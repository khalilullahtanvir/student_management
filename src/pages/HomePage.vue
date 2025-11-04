<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3">Loading homepage...</p>
    </div>

    <div v-else>
      <!-- Hero Section (ডায়নামিক) -->
      <section v-if="heroData" class="jumbotron jumbotron-fluid position-relative overlay-bottom mb-5">
        <div class="container text-center my-5 py-5">
          <h1 class="text-white mt-4 mb-4">{{ heroData.main_title }}</h1>
          <h1 class="text-white display-1 mb-5">{{ heroData.sub_title }}</h1>
          <div class="mx-auto mb-5" style="max-width: 600px;">
            <div class="input-group">
              <button class="btn btn-outline-light bg-white text-body px-4 dropdown-toggle" type="button">
                {{ heroData.courses_button_text }}
              </button>
              <input type="text" class="form-control border-light" :placeholder="heroData.search_placeholder" />
              <button class="btn btn-secondary px-4">{{ heroData.search_button_text }}</button>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section (ডায়নামিক) -->
      <section v-if="aboutData" class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-5 mb-4">
            <img class="img-fluid rounded" :src="aboutData.image_url" :alt="aboutData.title" />
          </div>
          <div class="col-lg-7">
            <h6 class="text-secondary text-uppercase">About Us</h6>
            <h2 class="display-5">{{ aboutData.title }}</h2>
            <p class="lead" v-html="aboutData.description"></p>
          </div>
        </div>
      </section>

      <!-- Counter Section -->
      <section class="py-5 bg-light text-center">
        <div class="container">
          <h6 class="text-secondary text-uppercase">Our Achievements</h6>
          <h1 class="display-5 mb-4">We Are Proud Of Our Growth</h1>

          <div class="row justify-content-center">
            <div class="col-md-3 col-6 mb-4" v-for="(stat, i) in stats" :key="i">
              <h2 class="text-primary">
                <CountTo :start-val="0" :end-val="stat.value" :duration="2000" />
              </h2>
              <p class="fw-bold">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Courses Carousel -->
      <section class="container py-5">
        <div class="text-center mb-4">
          <h6 class="text-secondary text-uppercase">Our Courses</h6>
          <h1 class="display-5">Explore Popular Courses</h1>
        </div>

        <Carousel :items-to-show="3" :wrap-around="true" :autoplay="2000" class="mt-4">
          <Slide v-for="(course, i) in courses" :key="i">
            <div class="card border-0 shadow-sm mx-2">
              <img :src="course.image" class="card-img-top" :alt="course.title" />
              <div class="card-body text-center">
                <h5>{{ course.title }}</h5>
                <p>{{ course.description }}</p>
                <router-link :to="`/courses/${course.id}`" class="btn btn-primary btn-sm">View Details</router-link>
              </div>
            </div>
          </Slide>
        </Carousel>
      </section>

      <!-- Testimonials -->
      <section class="py-5 bg-light">
        <div class="container">
          <div class="text-center mb-5">
            <h6 class="text-secondary text-uppercase">Testimonials</h6>
            <h1 class="display-5">What Our Students Say</h1>
          </div>

          <Carousel :items-to-show="2" :wrap-around="true" :autoplay="3000">
            <Slide v-for="(test, i) in testimonials" :key="i">
              <div class="card border-0 shadow-sm mx-3 p-4 text-center">
                <img :src="test.image" class="rounded-circle mx-auto mb-3" width="80" height="80" />
                <h5 class="text-primary">{{ test.name }}</h5>
                <p class="text-muted small">{{ test.role }}</p>
                <p class="fst-italic">“{{ test.comment }}”</p>
              </div>
            </Slide>
          </Carousel>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Carousel, Slide } from "vue3-carousel"
import "vue3-carousel/dist/carousel.css"
import CountTo from "vue3-count-to"
import apiClient from '@/api'

// সব ডেটার জন্য ref তৈরি করুন
const heroData = ref(null)
const aboutData = ref(null)
const stats = ref([])
const courses = ref([])
const testimonials = ref([])
const loading = ref(true)

// একটি ফাংশনে সব ডেটা আনুন
const fetchHomeData = async () => {
  try {
    // সব API গুলো একসাথে কল করুন
    const [heroRes, aboutRes, statsRes, coursesRes, testimonialsRes] = await Promise.all([
      apiClient.get('/hero'), // নতুন API কল
      apiClient.get('/about'), // নতুন API কল
      apiClient.get('/stats'),
      apiClient.get('/courses/featured'),
      apiClient.get('/testimonials')
    ])

    // সব ডেটা তাদের ref-এ এসাইন করুন
    heroData.value = heroRes.data
    aboutData.value = aboutRes.data
    stats.value = statsRes.data
    courses.value = coursesRes.data
    testimonials.value = testimonialsRes.data

  } catch (error) {
    console.error('Error fetching home data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHomeData()
})
</script>

<style scoped>
.card img {
  object-fit: cover;
  height: 200px;
}
</style>