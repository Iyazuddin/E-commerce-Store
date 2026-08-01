import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-store-backend-gosj.onrender.com/api",
});

export default API;
