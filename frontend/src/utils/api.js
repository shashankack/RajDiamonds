import axios from "axios";
import { refreshAccessToken, clearTokens } from "./auth";


const BASE_URL = 'http://localhost:8000/api/v1/';

export const getClientData = () => axios.get(`${BASE_URL}client-data/`);
export const getClientDetails = (client_id) => api.get(`${BASE_URL}client-data/${client_id}/`);
export const createClient = (client_data) => api.post(`${BASE_URL}client-data/`, client_data);
export const updateClient = (client_id, client_data) => api.put(`${BASE_URL}client-data/${client_id}/`, client_data);
export const deleteClient = (client_id) => api.delete(`${BASE_URL}client-data/${client_id}/`);


const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken(); // Call your refresh token function
        const newAccessToken = localStorage.getItem("accessToken");
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        clearTokens(); // Call your logout function
        window.location.href = "/login"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default api;
