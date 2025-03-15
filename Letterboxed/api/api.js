import axios from "axios";
import { updateAccessToken } from "../src/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.get("/authUser/reffresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Logging out...");
        const res = await api.post("/authUser/logout"); 
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
