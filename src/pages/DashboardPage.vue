<template>
  <div class="dashboard-page">
    <!-- Welcome Section -->
    <section class="welcome-section py-4 bg-primary text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1 class="display-5 fw-bold mb-3">Welcome back, {{ user?.name }}! 🎓</h1>
            <p class="lead mb-0">Here's what's happening with your learning journey today.</p>
          </div>
          <div class="col-md-4 text-md-end">
            <div class="d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
              <div class="me-3">
                <small class="d-block">Current Date</small>
                <strong>{{ currentDate }}</strong>
              </div>
              <div class="user-avatar">
                <img 
                  :src="user?.avatar || 'https://picsum.photos/seed/user123/100/100.jpg'" 
                  :alt="user?.name" 
                  class="rounded-circle border border-3 border-white"
                  width="60"
                  height="60"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Dashboard Content -->
    <div class="container py-5">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading your dashboard...</p>
      </div>

      <!-- Dashboard Content -->
      <div v-else-if="user">
        <!-- Stats Cards -->
        <div class="row mb-4">
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="card stats-card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                    <i class="fas fa-book fa-lg"></i>
                  </div>
                  <div>
                    <h6 class="text-muted mb-1">Enrolled Courses</h6>
                    <h3 class="mb-0">{{ enrolledCourses }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="card stats-card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="icon-box bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-3">
                    <i class="fas fa-check-circle fa-lg"></i>
                  </div>
                  <div>
                    <h6 class="text-muted mb-1">Completed</h6>
                    <h3 class="mb-0">{{ completedCourses }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="card stats-card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="icon-box bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center me-3">
                    <i class="fas fa-clock fa-lg"></i>
                  </div>
                  <div>
                    <h6 class="text-muted mb-1">In Progress</h6>
                    <h3 class="mb-0">{{ inProgressCourses }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="card stats-card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="icon-box bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center me-3">
                    <i class="fas fa-certificate fa-lg"></i>
                  </div>
                  <div>
                    <h6 class="text-muted mb-1">Certificates</h6>
                    <h3 class="mb-0">{{ certificates }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- User Profile Card -->
          <div class="col-lg-4 mb-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white border-0">
                <h5 class="mb-0">Profile Information</h5>
              </div>
              <div class="card-body">
                <div class="text-center mb-4">
                  <img 
                    :src="user?.avatar || 'https://picsum.photos/seed/user123/150/150.jpg'" 
                    :alt="user?.name" 
                    class="rounded-circle mb-3"
                    width="120"
                    height="120"
                  >
                  <h5>{{ user?.name }}</h5>
                  <p class="text-muted">{{ user?.email }}</p>
                </div>
                
                <div class="mb-3">
                  <div class="d-flex justify-content-between mb-1">
                    <span>Profile Completion</span>
                    <span>{{ profileCompletion }}%</span>
                  </div>
                  <div class="progress">
                    <div 
                      class="progress-bar bg-primary" 
                      role="progressbar" 
                      :style="`width: ${profileCompletion}%`"
                      :aria-valuenow="profileCompletion" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <p><strong>Member Since:</strong> {{ new Date(user.created_at).toLocaleDateString() }}</p>
                  <p><strong>Last Login:</strong> {{ new Date(user.last_login || Date.now()).toLocaleDateString() }}</p>
                </div>
                
                <router-link to="/profile" class="btn btn-outline-primary w-100">
                  <i class="fas fa-user me-2"></i> View Full Profile
                </router-link>
              </div>
            </div>
          </div>

          <!-- Recent Courses -->
          <div class="col-lg-8 mb-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Recent Courses</h5>
                <router-link to="/courses" class="btn btn-sm btn-outline-primary">
                  View All
                </router-link>
              </div>
              <div class="card-body">
                <div v-if="recentCourses.length > 0">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Course</th>
                          <th>Progress</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="course in recentCourses" :key="course.id">
                          <td>
                            <div class="d-flex align-items-center">
                              <img 
                                :src="course.image || 'https://picsum.photos/seed/course' + course.id + '/50/50.jpg'" 
                                :alt="course.title" 
                                class="rounded me-3"
                                width="40"
                                height="40"
                              >
                              <div>
                                <h6 class="mb-0">{{ course.title }}</h6>
                                <small class="text-muted">{{ course.instructor || 'Staff' }}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="progress" style="height: 8px;">
                              <div 
                                class="progress-bar" 
                                :class="getProgressBarClass(course.progress)"
                                role="progressbar" 
                                :style="`width: ${course.progress}%`"
                                :aria-valuenow="course.progress" 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <small>{{ course.progress }}%</small>
                          </td>
                          <td>
                            <span class="badge" :class="getStatusBadgeClass(course.status)">
                              {{ course.status }}
                            </span>
                          </td>
                          <td>
                            <router-link 
                              :to="`/courses/${course.id}`" 
                              class="btn btn-sm btn-outline-primary"
                            >
                              Continue
                            </router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-else class="text-center py-4">
                  <i class="fas fa-book-open fa-3x text-muted mb-3"></i>
                  <h5>No courses enrolled yet</h5>
                  <p class="text-muted">Start your learning journey by enrolling in a course</p>
                  <router-link to="/courses" class="btn btn-primary">
                    Browse Courses
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- Upcoming Deadlines -->
          <div class="col-lg-6 mb-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white border-0">
                <h5 class="mb-0">Upcoming Deadlines</h5>
              </div>
              <div class="card-body">
                <div v-if="deadlines.length > 0">
                  <div v-for="(deadline, index) in deadlines" :key="index" class="deadline-item mb-3">
                    <div class="d-flex align-items-start">
                      <div class="deadline-date me-3">
                        <div class="date-box text-center">
                          <div class="date-day">{{ getDay(deadline.date) }}</div>
                          <div class="date-month">{{ getMonth(deadline.date) }}</div>
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <h6 class="mb-1">{{ deadline.title }}</h6>
                        <p class="text-muted mb-1">{{ deadline.course }}</p>
                        <div class="d-flex align-items-center">
                          <i class="fas fa-clock text-muted me-1"></i>
                          <small class="text-muted">{{ getTimeRemaining(deadline.date) }}</small>
                        </div>
                      </div>
                      <div class="deadline-priority">
                        <span class="badge" :class="getPriorityBadgeClass(deadline.priority)">
                          {{ deadline.priority }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-4">
                  <i class="fas fa-calendar-check fa-3x text-muted mb-3"></i>
                  <h5>No upcoming deadlines</h5>
                  <p class="text-muted">Enjoy your free time!</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activities -->
          <div class="col-lg-6 mb-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white border-0">
                <h5 class="mb-0">Recent Activities</h5>
              </div>
              <div class="card-body">
                <div v-if="activities.length > 0">
                  <div v-for="(activity, index) in activities" :key="index" class="activity-item mb-3">
                    <div class="d-flex">
                      <div class="activity-icon me-3">
                        <div class="icon-box" :class="getActivityIconClass(activity.type)">
                          <i :class="getActivityIcon(activity.type)"></i>
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <p class="mb-1">{{ activity.description }}</p>
                        <small class="text-muted">{{ getTimeAgo(activity.timestamp) }}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-4">
                  <i class="fas fa-history fa-3x text-muted mb-3"></i>
                  <h5>No recent activities</h5>
                  <p class="text-muted">Start learning to see your activities here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="row mb-4">
          <div class="col-12">
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-white border-0">
                <h5 class="mb-0">Quick Actions</h5>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-3 col-sm-6">
                    <router-link to="/courses" class="quick-action-card">
                      <div class="card border-0 shadow-sm h-100 text-center">
                        <div class="card-body p-3">
                          <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                            <i class="fas fa-search fa-lg"></i>
                          </div>
                          <h6>Browse Courses</h6>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <router-link to="/enrollment" class="quick-action-card">
                      <div class="card border-0 shadow-sm h-100 text-center">
                        <div class="card-body p-3">
                          <div class="icon-box bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                            <i class="fas fa-graduation-cap fa-lg"></i>
                          </div>
                          <h6>My Enrollments</h6>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <router-link to="/certificates" class="quick-action-card">
                      <div class="card border-0 shadow-sm h-100 text-center">
                        <div class="card-body p-3">
                          <div class="icon-box bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                            <i class="fas fa-certificate fa-lg"></i>
                          </div>
                          <h6>My Certificates</h6>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <router-link to="/settings" class="quick-action-card">
                      <div class="card border-0 shadow-sm h-100 text-center">
                        <div class="card-body p-3">
                          <div class="icon-box bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                            <i class="fas fa-cog fa-lg"></i>
                          </div>
                          <h6>Settings</h6>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-5">
        <div class="alert alert-danger">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>
        <button class="btn btn-primary" @click="loadUserData">
          <i class="fas fa-redo me-2"></i> Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';

export default {
  name: "DashboardPage",
  setup() {
    // Data
    const user = ref(null);
    const loading = ref(true);
    const error = ref("");
    
    // Mock data for demonstration
    const enrolledCourses = ref(5);
    const completedCourses = ref(2);
    const inProgressCourses = ref(3);
    const certificates = ref(2);
    
    const recentCourses = ref([
      {
        id: 1,
        title: "Web Development Fundamentals",
        instructor: "John Doe",
        progress: 75,
        status: "In Progress",
        image: "https://picsum.photos/seed/course1/50/50.jpg"
      },
      {
        id: 2,
        title: "Advanced JavaScript",
        instructor: "Jane Smith",
        progress: 100,
        status: "Completed",
        image: "https://picsum.photos/seed/course2/50/50.jpg"
      },
      {
        id: 3,
        title: "UI/UX Design Principles",
        instructor: "Emily Johnson",
        progress: 30,
        status: "In Progress",
        image: "https://picsum.photos/seed/course3/50/50.jpg"
      }
    ]);
    
    const deadlines = ref([
      {
        title: "JavaScript Assignment",
        course: "Advanced JavaScript",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        priority: "High"
      },
      {
        title: "Design Project",
        course: "UI/UX Design Principles",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        priority: "Medium"
      },
      {
        title: "Web Development Quiz",
        course: "Web Development Fundamentals",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        priority: "Low"
      }
    ]);
    
    const activities = ref([
      {
        type: "course",
        description: "Completed lesson: Introduction to React",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        type: "achievement",
        description: "Earned badge: Fast Learner",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        type: "course",
        description: "Started course: Advanced JavaScript",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        type: "certificate",
        description: "Received certificate: Web Development Basics",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      }
    ]);
    
    // Computed properties
    const currentDate = computed(() => {
      return new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    });
    
    const profileCompletion = computed(() => {
      // Calculate based on profile fields filled
      let completion = 30; // Base completion for name and email
      
      if (user.value?.avatar) completion += 20;
      if (user.value?.bio) completion += 20;
      if (user.value?.phone) completion += 15;
      if (user.value?.location) completion += 15;
      
      return completion;
    });
    
    // Methods
    const loadUserData = () => {
      loading.value = true;
      error.value = "";
      
      try {
        const userData = JSON.parse(sessionStorage.getItem("student"));
        if (userData) {
          user.value = userData;
          console.log("User data loaded:", userData);
        } else {
          error.value = "No user data found. Please log in again.";
        }
      } catch (err) {
        console.error("Error loading user data:", err);
        error.value = "Failed to load user information. Please log in again.";
      } finally {
        loading.value = false;
      }
    };
    
    const getProgressBarClass = (progress) => {
      if (progress >= 80) return "bg-success";
      if (progress >= 50) return "bg-info";
      if (progress >= 30) return "bg-warning";
      return "bg-danger";
    };
    
    const getStatusBadgeClass = (status) => {
      switch (status) {
        case "Completed": return "bg-success";
        case "In Progress": return "bg-info";
        case "Not Started": return "bg-secondary";
        default: return "bg-secondary";
      }
    };
    
    const getDay = (date) => {
      return new Date(date).getDate();
    };
    
    const getMonth = (date) => {
      return new Date(date).toLocaleDateString('en-US', { month: 'short' });
    };
    
    const getTimeRemaining = (date) => {
      const now = new Date();
      const targetDate = new Date(date);
      const diffTime = Math.abs(targetDate - now);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Tomorrow";
      return `${diffDays} days`;
    };
    
    const getPriorityBadgeClass = (priority) => {
      switch (priority) {
        case "High": return "bg-danger";
        case "Medium": return "bg-warning";
        case "Low": return "bg-info";
        default: return "bg-secondary";
      }
    };
    
    const getActivityIconClass = (type) => {
      switch (type) {
        case "course": return "bg-primary bg-opacity-10 text-primary";
        case "achievement": return "bg-warning bg-opacity-10 text-warning";
        case "certificate": return "bg-success bg-opacity-10 text-success";
        default: return "bg-secondary bg-opacity-10 text-secondary";
      }
    };
    
    const getActivityIcon = (type) => {
      switch (type) {
        case "course": return "fas fa-book";
        case "achievement": return "fas fa-trophy";
        case "certificate": return "fas fa-certificate";
        default: return "fas fa-circle";
      }
    };
    
    const getTimeAgo = (timestamp) => {
      const now = new Date();
      const past = new Date(timestamp);
      const diffTime = Math.abs(now - past);
      
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 30) return `${diffDays} days ago`;
      
      return past.toLocaleDateString();
    };
    
    // Lifecycle
    onMounted(() => {
      loadUserData();
    });
    
    return {
      user,
      loading,
      error,
      currentDate,
      profileCompletion,
      enrolledCourses,
      completedCourses,
      inProgressCourses,
      certificates,
      recentCourses,
      deadlines,
      activities,
      loadUserData,
      getProgressBarClass,
      getStatusBadgeClass,
      getDay,
      getMonth,
      getTimeRemaining,
      getPriorityBadgeClass,
      getActivityIconClass,
      getActivityIcon,
      getTimeAgo
    };
  }
};
</script>

<style scoped>
.dashboard-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stats-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.icon-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar img {
  object-fit: cover;
}

.progress {
  height: 8px;
}

.deadline-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1rem;
}

.deadline-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.date-box {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 50px;
}

.date-day {
  font-size: 1.2rem;
  font-weight: bold;
}

.date-month {
  font-size: 0.8rem;
  text-transform: uppercase;
}

.activity-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1rem;
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.quick-action-card {
  text-decoration: none;
  color: inherit;
  display: block;
}

.quick-action-card:hover {
  text-decoration: none;
  color: inherit;
}

.quick-action-card .card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.quick-action-card:hover .card {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .welcome-section .row {
    text-align: center;
  }
  
  .welcome-section .col-md-4 {
    margin-top: 1rem;
  }
  
  .welcome-section .d-flex {
    justify-content: center !important;
  }
}
</style>