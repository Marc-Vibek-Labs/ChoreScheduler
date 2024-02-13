import axios from "axios";
import { storage } from "../utils/storage";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Request interceptor to attach the JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Fetch your JWT token from a secure storage or wherever you store it
    const jwtToken = storage.getToken();
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error logic here
    return Promise.reject(error);
  },
);

export default axiosInstance;
