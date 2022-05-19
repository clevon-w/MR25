import axios from 'axios'

const API_URL = '/api/results/'

// Register user 
const getResults = async () => {
  const response = await axios.get(API_URL)
  
  return response.data
}

const resultService = {
  getResults
}

export default resultService