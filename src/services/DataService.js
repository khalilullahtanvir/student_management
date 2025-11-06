import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/login", data);
  }
  register(data) {
    return http.post("/register", data);
  }
  getCourses() {
    return http.get("/courses");
  }
  enroll(courseId) {
    const studentId = JSON.parse(sessionStorage.getItem("student")).id;
    return http.post(`/enrollments`, { course_id: courseId, student_id: studentId });
  }
  getEnrollments() {
    const studentId = JSON.parse(sessionStorage.getItem("student")).id;
    return http.get(`/enrollments?student_id=${studentId}`);
  }
  getPayments(enrollmentId) {
    return http.get(`/payments?enrollment_id=${enrollmentId}`);
  }
  pay(data) {
    return http.post("/payments", data);
  }
}


export default new DataService();