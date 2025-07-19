import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://e-commerceserver-8fgu.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
