import axios from 'axios';

// Use the same API URL formatting as hourLogService
const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const API_URL = baseUrl.startsWith('http') ? baseUrl : `http://${baseUrl}`;

axios.defaults.withCredentials = true;

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Token ${token}` } : {};
};

const noteService = {
    getMyNotes: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/notes/`, {
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
            const response = await axios.get(`${API_URL}/api/notes/?all=true`, {
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
            const response = await axios.get(`${API_URL}/api/notes/${id}/`, {
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
            const response = await axios.post(`${API_URL}/api/notes/`, noteData, {
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
            const response = await axios.put(`${API_URL}/api/notes/${id}/`, noteData, {
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
            await axios.delete(`${API_URL}/api/notes/${id}/`, {
                headers: getAuthHeader()
            });
            return true;
        } catch (error) {
            console.error('Error deleting note:', error);
            throw error;
        }
    },
    
    /* Routing for programs */
    getPrograms: async () => {
      try {
          const response = await axios.get(`${API_URL}/api/programs/`, {
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
          const response = await axios.post(`${API_URL}/api/programs/`, programData, {
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
        await axios.delete(`${API_URL}/api/programs/${programId}/`, {
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