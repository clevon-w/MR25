/**
 * Handles the HTTP requests and responses for authentications
 */

import axios from 'axios'

const API_URL = '/api/users/'

// Register user 
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user 
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Update user
const update = async (user) => {
  const response = await axios.patch(API_URL + user._Id, user)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const authService = {
  register,
  logout,
  login,
  update
}

export default authService