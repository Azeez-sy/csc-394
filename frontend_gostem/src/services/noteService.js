/*import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Configure axios to include credentials (cookies) with every request
axios.defaults.withCredentials = true;

// Helper function to get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  console.log('Token:', token); // Log the token
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  console.log('Headers:', headers); // Log the headers
  return headers;
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

export default noteService;*/

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

axios.defaults.withCredentials = true;

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken'); // Following what was done in hourlog service
    return token ? { Authorization: `Token ${token}` } : {}; // Following what was done in hourlog service
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
            //console.log("noteData being sent:", noteData);
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
            //console.log("noteData being sent for update:", noteData);
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
    },
    
    /* Routing for programs - sky*/
    getPrograms: async () => {
      try {
          const response = await axios.get(`${API_URL}/programs/`, {
              headers: getAuthHeader(),
          });
          return response.data;
      } catch (error) {
          console.error('Error fetching programs:', error);
          throw error;
      }
    },

    createProgram: async (programData) => {
      try {
          const response = await axios.post(`${API_URL}/programs/`, programData, {
              headers: getAuthHeader(),
          });
          return response.data;
      } catch (error) {
          console.error('Error creating program:', error);
          throw error;
      }
    },

    deleteProgram: async (programId) => {
      try {
        await axios.delete(`${API_URL}/programs/${programId}/`, {
          headers: getAuthHeader(),
        });
          return true;
        } catch (error) {
          console.error('Error deleting program:', error);
          throw error;
        }
    },
};

export default noteService;