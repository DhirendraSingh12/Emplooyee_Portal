import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || "Internal server error occurred";
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);


// Admin Login Services
export const loginAdmin = async (credentials) => {
    try {
      const response = await API.post("/admin/login", credentials);
      const { jwtToken } = response.data;
      if (jwtToken) {
        toast.success('Login successful');
        return { jwtToken }; 
      }
    } catch (error) {
      throw error; 
    }
  };