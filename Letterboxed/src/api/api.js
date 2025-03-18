import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.error(
      "Interceptor caught error:",
      error.response?.status,
      error.config?.url
    );

    if (originalRequest.url === "/authUser/logout") {
      console.log("Logout request failed, forcing client-side logout...");
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }

    if (
      originalRequest.url === "/authUser/reffresh" &&
      error.response?.status === 403
    ) {
      console.log("Refresh token expired or invalid, logging out user...");
      try {
        await api.get("/authUser/logout");
        console.log("Server-side logout successful");
      } catch (logoutError) {
        console.error(
          "Logout request failed:",
          logoutError.response?.status,
          logoutError.response?.data
        );
      }
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Attempting token refresh...");

      try {
        const { data } = await api.get("/authUser/reffresh");
        console.log("Refresh successful:", data);
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Refresh token request FAILED:",
          refreshError.response?.status,
          refreshError.response?.data
        );
        console.log("Refresh failed, logging out user...");
        try {
          await api.get("/authUser/logout");
          console.log("Server-side logout successful");
        } catch (logoutError) {
          console.error(
            "Logout request failed:",
            logoutError.response?.status,
            logoutError.response?.data
          );
        }
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
