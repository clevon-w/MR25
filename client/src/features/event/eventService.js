/**
 * Handles the HTTP requests and responses for events
 */

import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://mr-25-api.vercel.app" });
const API_URL = "/api/events/";

// Get all events
const getEvents = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const eventService = {
  getEvents,
};

export default eventService;
