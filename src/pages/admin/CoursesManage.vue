<template>
  <div class="container py-5">
    <h2>Manage Courses</h2>

    <form @submit.prevent="saveCourse" class="my-4">
      <input v-model="form.title" placeholder="Title" class="form-control mb-2" />
      <textarea v-model="form.description" placeholder="Description" class="form-control mb-2"></textarea>
      <input v-model="form.duration" placeholder="Duration" class="form-control mb-2" />
      <input v-model="form.price" type="number" placeholder="Price" class="form-control mb-2" />
      <input v-model="form.level" placeholder="Level" class="form-control mb-2" />
      <button class="btn btn-primary">Save</button>
    </form>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th><th>Title</th><th>Duration</th><th>Price</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in courses" :key="course.id">
          <td>{{ index + 1 }}</td>
          <td>{{ course.title }}</td>
          <td>{{ course.duration }}</td>
          <td>{{ course.price }}</td>
          <td>
            <button class="btn btn-sm btn-danger" @click="deleteCourse(course.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      courses: [],
      form: { title: '', description: '', duration: '', price: '', level: '' },
    }
  },
  async created() {
    await this.fetchCourses()
  },
  methods: {
    async fetchCourses() {
      const res = await axios.get('http://localhost:8000/api/admin/courses')
      this.courses = res.data
    },
    async saveCourse() {
      await axios.post('http://localhost:8000/api/admin/courses', this.form)
      this.form = { title: '', description: '', duration: '', price: '', level: '' }
      this.fetchCourses()
    },
    async deleteCourse(id) {
      if (confirm('Delete this course?')) {
        await axios.delete(`http://localhost:8000/api/admin/courses/${id}`)
        this.fetchCourses()
      }
    },
  },
}
</script>
