import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // <--- localhost না দিয়ে 127.0.0.1 ব্যবহার করো
  withCredentials: true,
});

export default api;
