import axios from 'axios';

const API = {
  createSession: async (params) => {
    return await axios.post(`${PROTOCOL}//${API_URL}/authenticate`, params);
  },

  createAccount: async (params) => {
    return await axios.post(`${PROTOCOL}//${API_URL}/users`, params);
  },

  fetchTwilioConfig: async (token) => {
    return await axios.get(`${PROTOCOL}//${API_URL}/twilio`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchCurrentUser: async (token) => {
    return await axios.get(`${PROTOCOL}//${API_URL}/users/current`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchUsers: async (token) => {
    return await axios.get(`${PROTOCOL}//${API_URL}/current_user/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
}

export default API;
