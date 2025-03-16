import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Configure axios to include credentials (cookies) with every request
axios.defaults.withCredentials = true;

// Helper function to get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const noteService = {
  getMyNotes: async () => {
    try {
      const response = await axios.get(`${API_URL}/notes/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my notes:', error);
      throw error;
    }
  },

  getAllNotes: async () => {
    try {
      const response = await axios.get(`${API_URL}/notes/?all=true`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all notes:', error);
      throw error;
    }
  },

  getNote: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/notes/${id}/`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  },

  createNote: async (noteData) => {
    try {
      const response = await axios.post(`${API_URL}/notes/`, noteData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  updateNote: async (id, noteData) => {
    try {
      const response = await axios.put(`${API_URL}/notes/${id}/`, noteData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}/`, {
        headers: getAuthHeader()
      });
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
};

export default noteService;