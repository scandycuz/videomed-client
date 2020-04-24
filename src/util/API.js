import axios from 'axios';
import { protocol, base } from 'util/env';

const API = {
  createSession: async (params) => {
    return await axios.post(`${protocol}${base}/authenticate`, params);
  },

  createAccount: async (params) => {
    return await axios.post(`${protocol}${base}/users`, params);
  },

  fetchTwilioConfig: async (token) => {
    return await axios.get(`${protocol}${base}/twilio`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchCurrentUser: async (token) => {
    return await axios.get(`${protocol}${base}/users/current`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default API;
