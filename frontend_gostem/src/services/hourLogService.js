import axios from 'axios';

// Base URL for API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Configure axios to include credentials for CORS
axios.defaults.withCredentials = true;

const hourLogService = {
  // Get all hour logs for the logged-in user
  getHourLogs: async () => {
    try {
      // Get token from localStorage (same as in App.js)
      const token = localStorage.getItem("authToken");
      
      const response = await axios.get(`${API_URL}/hour_log/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching hour logs:', error);
      throw error;
    }
  },
  
  // Create a new hour log entry
  createHourLog: async (hourLogData) => {
    try {
      // Get token from localStorage (same as in App.js)
      const token = localStorage.getItem("authToken");
      
      const response = await axios.post(`${API_URL}/hour_log/`, hourLogData, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating hour log:', error);
      throw error;
    }
  }
};

export default hourLogService;