import axios from "axios";
// const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:8002",
});

// Signup function
export const signup = async (data) => {
  const response = await api.post("/api/auth/signup", data);
  return response.data;
};

// Login function
export const login = async (data) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};
