import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://mr-25-api.vercel.app" });
const API_URL = process.env.BASE_URL + "/api/results/";

//Get results
const getResults = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

//Creates new result
const createResult = async (resultData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, resultData, config);

  if (response.data) {
    localStorage.setItem("result", JSON.stringify(response.data));
  }

  return response.data;
};

const updateResult = async (resultData) => {
  const response = await axiosInstance.patch(
    API_URL + resultData.id,
    resultData.data
  );
  if (response.data) {
    localStorage.setItem("result", JSON.stringify(response.data));
  }
  return response.data;
};

const resultService = {
  getResults,
  createResult,
  updateResult,
};

export default resultService;
