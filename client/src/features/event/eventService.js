/**
 * Handles the HTTP requests and responses for events
 */

import axios from "axios";

const API_URL = process.env.BASE_URL + "/api/events/";

// Get all events
const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const eventService = {
  getEvents,
};

export default eventService;
