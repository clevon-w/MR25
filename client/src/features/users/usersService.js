import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://mr-25-api.vercel.app" });
const API_URL = "/api/users/";

//Get users
const getUsers = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const usersService = {
  getUsers,
};

export default usersService;
