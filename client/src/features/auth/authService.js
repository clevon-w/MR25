/**
 * Handles the HTTP requests and responses for authentications
 */

import axios from "axios";

const axiosIsntance = axios.create({ baseURL: "https://mr-25-api.vercel.app" });
const API_URL = process.env.BASE_URL + "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axiosIsntance.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axiosIsntance.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Forget password
const forgetPassword = async (userData) => {
  const response = await axiosIsntance.post(
    API_URL + "forgetPassword",
    userData
  );
  return response.data;
};

// Reset password
const authenticateResetPassword = async (token) => {
  const response = await axiosIsntance.get(API_URL + "reset/" + token);
  return response.data;
};

// Update user
const update = async (userData) => {
  const response = await axiosIsntance.patch(
    API_URL + userData.id,
    userData.data
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// reset password for user
const resetPw = async (userData) => {
  const response = await axiosIsntance.patch(
    API_URL + "updatePasswordViaEmail",
    userData
  );

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  update,
  login,
  forgetPassword,
  authenticateResetPassword,
  resetPw,
};

export default authService;
