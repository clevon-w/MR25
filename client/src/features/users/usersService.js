import axios from "axios";

const API_URL = process.env.BASE_URL + "/api/users/";

//Get users
const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const usersService = {
  getUsers,
};

export default usersService;
