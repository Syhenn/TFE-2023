import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:7227'; 

export const fetchData = async (endpoint, params) => {
    try {
      const response = await axios.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};