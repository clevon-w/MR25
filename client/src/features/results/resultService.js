import axios from 'axios'

const API_URL = '/api/results/'

//Get results
const getResults = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

//Creates new result
const createResult = async (resultData) => {
  const response = await axios.post(API_URL, resultData)
  if (response.data) {
    localStorage.setItem('result', JSON.stringify(response.data))
  }
  return response.data
}

const resultService = {
  getResults, createResult
}

export default resultService