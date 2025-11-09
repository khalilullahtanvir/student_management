<template>
  <div class="container py-5">
    <!-- Page Header -->
    <div class="row mb-4">
      <div class="col-lg-8">
        <h1 class="display-5 fw-bold">All Courses</h1>
        <p class="lead text-muted">Discover our wide range of courses designed to help you achieve your goals</p>
      </div>
      <div class="col-lg-4 text-lg-end">
        <div class="d-flex align-items-center justify-content-lg-end">
          <span class="me-2 text-muted">View:</span>
          <div class="btn-group" role="group">
            <button 
              type="button" 
              class="btn btn-outline-secondary" 
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <i class="fas fa-th"></i>
            </button>
            <button 
              type="button" 
              class="btn btn-outline-secondary" 
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <!-- Search Bar -->
          <div class="col-md-6">
            <div class="input-group">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search courses..." 
                v-model="searchQuery"
                @keyup.enter="filterCourses"
              >
              <button class="btn btn-primary" @click="filterCourses">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          
          <!-- Category Filter -->
          <div class="col-md-3">
            <select class="form-select" v-model="selectedCategory" @change="filterCourses">
              <option value="">All Categories</option>
              <option value="web-development">Web Development</option>
              <option value="app-development">App Development</option>
              <option value="data-science">Data Science</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="business">Business</option>
            </select>
          </div>
          
          <!-- Sort Options -->
          <div class="col-md-3">
            <select class="form-select" v-model="sortBy" @change="sortCourses">
              <option value="default">Sort By</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading courses...</p>
    </div>

    <!-- No Results -->
    <div v-else-if="filteredCourses.length === 0" class="text-center py-5">
      <i class="fas fa-search fa-3x text-muted mb-3"></i>
      <h4>No courses found</h4>
      <p class="text-muted">Try adjusting your search or filters</p>
      <button class="btn btn-outline-primary" @click="resetFilters">Reset Filters</button>
    </div>

    <!-- Courses Grid View -->
    <div v-else-if="viewMode === 'grid'" class="row">
      <div v-for="course in paginatedCourses" :key="course.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 course-card shadow-sm">
          <div class="position-relative">
            <img 
              :src="course.image || 'https://picsum.photos/seed/course' + course.id + '/400/250.jpg'" 
              class="card-img-top course-image" 
              :alt="course.title"
            >
            <div class="position-absolute top-0 end-0 p-2">
              <span class="badge bg-primary">{{ course.category || 'Popular' }}</span>
            </div>
            <div class="position-absolute top-0 start-0 p-2">
              <span class="badge bg-success" v-if="course.featured">Featured</span>
            </div>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ course.title }}</h5>
            <p class="card-text text-muted">{{ course.description.substring(0, 100) }}...</p>
            
            <div class="mb-2">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <small class="text-muted">Instructor</small>
                <small>{{ course.instructor || 'Staff' }}</small>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-1">
                <small class="text-muted">Duration</small>
                <small>{{ course.duration || '8 weeks' }}</small>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-1">
                <small class="text-muted">Level</small>
                <small>{{ course.level || 'Beginner' }}</small>
              </div>
            </div>
            
            <div class="d-flex align-items-center mb-3">
              <div class="me-2">
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star-half-alt text-warning"></i>
              </div>
              <small class="text-muted">({{ Math.floor(Math.random() * 500) + 100 }})</small>
            </div>
            
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="mb-0 text-primary">${{ course.price || '99' }}</h4>
                <span class="text-decoration-line-through text-muted" v-if="course.originalPrice">
                  ${{ course.originalPrice }}
                </span>
              </div>
              <div class="d-grid gap-2">
                <button 
                  class="btn btn-primary" 
                  @click="enroll(course.id)"
                  :disabled="enrolling === course.id"
                >
                  <span v-if="enrolling === course.id">
                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Enrolling...
                  </span>
                  <span v-else>
                    <i class="fas fa-user-plus me-1"></i> Enroll Now
                  </span>
                </button>
                <button class="btn btn-outline-secondary" @click="viewDetails(course.id)">
                  <i class="fas fa-info-circle me-1"></i> View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Courses List View -->
    <div v-else class="row">
      <div v-for="course in paginatedCourses" :key="course.id" class="col-12 mb-4">
        <div class="card shadow-sm course-list-card">
          <div class="row g-0">
            <div class="col-md-4">
              <img 
                :src="course.image || 'https://picsum.photos/seed/course' + course.id + '/400/250.jpg'" 
                class="img-fluid rounded-start h-100 course-image" 
                :alt="course.title"
                style="object-fit: cover;"
              >
            </div>
            <div class="col-md-8">
              <div class="card-body h-100 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="card-title">{{ course.title }}</h5>
                  <div>
                    <span class="badge bg-primary me-1">{{ course.category || 'Popular' }}</span>
                    <span class="badge bg-success" v-if="course.featured">Featured</span>
                  </div>
                </div>
                <p class="card-text">{{ course.description.substring(0, 200) }}...</p>
                
                <div class="row mb-3">
                  <div class="col-md-3 col-6 mb-2">
                    <small class="text-muted d-block">Instructor</small>
                    <span>{{ course.instructor || 'Staff' }}</span>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <small class="text-muted d-block">Duration</small>
                    <span>{{ course.duration || '8 weeks' }}</span>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <small class="text-muted d-block">Level</small>
                    <span>{{ course.level || 'Beginner' }}</span>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <small class="text-muted d-block">Rating</small>
                    <div class="d-flex align-items-center">
                      <div class="me-1">
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star text-warning"></i>
                        <i class="fas fa-star-half-alt text-warning"></i>
                      </div>
                      <small>({{ Math.floor(Math.random() * 500) + 100 }})</small>
                    </div>
                  </div>
                </div>
                
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <div>
                    <h4 class="mb-0 text-primary d-inline-block">${{ course.price || '99' }}</h4>
                    <span class="text-decoration-line-through text-muted ms-2" v-if="course.originalPrice">
                      ${{ course.originalPrice }}
                    </span>
                  </div>
                  <div>
                    <button 
                      class="btn btn-primary me-2" 
                      @click="enroll(course.id)"
                      :disabled="enrolling === course.id"
                    >
                      <span v-if="enrolling === course.id">
                        <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        Enrolling...
                      </span>
                      <span v-else>
                        <i class="fas fa-user-plus me-1"></i> Enroll
                      </span>
                    </button>
                    <button class="btn btn-outline-secondary" @click="viewDetails(course.id)">
                      <i class="fas fa-info-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Course pagination" v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="currentPage = 1">First</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
        </li>
        
        <li 
          v-for="page in displayedPages" 
          :key="page" 
          class="page-item" 
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
        </li>
        
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="currentPage = totalPages">Last</a>
        </li>
      </ul>
    </nav>

    <!-- Success Message -->
    <div v-if="message" class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-success text-white">
          <strong class="me-auto">Success</strong>
          <button type="button" class="btn-close btn-close-white" @click="message = ''"></button>
        </div>
        <div class="toast-body">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataService from "../services/DataService.js";

export default {
  name: "CoursesPage",
  setup() {
    const router = useRouter();
    
    // Data
    const courses = ref([]);
    const loading = ref(true);
    const message = ref("");
    const enrolling = ref(null);
    
    // View and Filters
    const viewMode = ref('grid');
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const sortBy = ref('default');
    const currentPage = ref(1);
    const itemsPerPage = ref(6);
    
    // Computed Properties
    const filteredCourses = computed(() => {
      let result = [...courses.value];
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query)
        );
      }
      
      // Apply category filter
      if (selectedCategory.value) {
        result = result.filter(course => course.category === selectedCategory.value);
      }
      
      // Apply sorting
      switch (sortBy.value) {
        case 'name':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'price-low':
          result.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case 'price-high':
          result.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case 'rating':
          // In a real app, you would sort by actual rating
          result.sort(() => Math.random() - 0.5);
          break;
      }
      
      return result;
    });
    
    const totalPages = computed(() => {
      return Math.ceil(filteredCourses.value.length / itemsPerPage.value);
    });
    
    const paginatedCourses = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredCourses.value.slice(start, end);
    });
    
    const displayedPages = computed(() => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages.value <= maxVisible) {
        for (let i = 1; i <= totalPages.value; i++) {
          pages.push(i);
        }
      } else {
        const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
        const end = Math.min(totalPages.value, start + maxVisible - 1);
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    });
    
    // Methods
    const fetchCourses = async () => {
      loading.value = true;
      try {
        const res = await DataService.getCourses();
        courses.value = res.data.data || res.data || [];
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        loading.value = false;
      }
    };
    
    const enroll = async (courseId) => {
      enrolling.value = courseId;
      try {
        const res = await DataService.enroll(courseId);
        message.value = res.data.message || "Successfully enrolled in course!";
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
          message.value = "";
        }, 5000);
      } catch (err) {
        console.error("Enrollment error:", err);
        message.value = err.response?.data?.message || "Failed to enroll in course. Please try again.";
      } finally {
        enrolling.value = null;
      }
    };
    
    const viewDetails = (courseId) => {
      router.push(`/courses/${courseId}`);
    };
    
    const filterCourses = () => {
      currentPage.value = 1;
    };
    
    const sortCourses = () => {
      currentPage.value = 1;
    };
    
    const resetFilters = () => {
      searchQuery.value = '';
      selectedCategory.value = '';
      sortBy.value = 'default';
      currentPage.value = 1;
    };
    
    // Lifecycle
    onMounted(() => {
      fetchCourses();
    });
    
    return {
      courses,
      loading,
      message,
      enrolling,
      viewMode,
      searchQuery,
      selectedCategory,
      sortBy,
      currentPage,
      filteredCourses,
      totalPages,
      paginatedCourses,
      displayedPages,
      enroll,
      viewDetails,
      filterCourses,
      sortCourses,
      resetFilters
    };
  }
};
</script>

<style scoped>
.course-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.course-list-card {
  transition: box-shadow 0.3s ease;
}

.course-list-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.course-image {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.course-card:hover .course-image {
  transform: scale(1.05);
}

.badge {
  font-size: 0.75rem;
}

.pagination .page-link {
  color: #0d6efd;
}

.pagination .page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.toast {
  min-width: 250px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .course-list-card .row {
    flex-direction: column;
  }
  
  .course-list-card .col-md-4 {
    margin-bottom: 1rem;
  }
  
  .course-list-card img {
    height: 200px;
  }
}
</style>