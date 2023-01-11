/**
 * Handles the HTTP requests and responses for events
 */

import axios from "axios";

const axiosIntance = axios.create({ baseURL: process.env.BASE_URL });
const API_URL = "/api/events/";

// Get all events
const getEvents = async () => {
  const response = await axiosIntance.get(API_URL);
  return response.data;
};

const eventService = {
  getEvents,
};

export default eventService;
