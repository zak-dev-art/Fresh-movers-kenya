import axios from "axios";

const isVercel = window.location.hostname.includes("vercel.app");

export const api = axios.create({
  baseURL: isVercel ? "/api" : "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});

api.interceptors.request.use(request => {
  console.log("Starting Request:", request.method.toUpperCase(), request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log("Response:", response.status, response.data);
    return response;
  },
  error => {
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);