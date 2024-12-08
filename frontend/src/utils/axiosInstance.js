import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://rajdiamonds-backend.onrender.com/api/v1/",
});

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refresh_token");
            try {
                const response = await axios.post(
                    "https://rajdiamonds-backend.onrender.com/api/v1/token/refresh/",
                    { refresh: refreshToken }
                );
                const { access } = response.data;
                localStorage.setItem("access_token", access);
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
