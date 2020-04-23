import axios from 'axios';
import { protocol, base } from 'util/env';

const API = {
  createSession: async (params) => {
    try {
      const resp = await axios.post(`${protocol}${base}/authenticate`, params);

      return resp;
    } catch(e) {
      console.log(e);
    }
  },

  fetchTwilioConfig: async (token) => {
    try {
      const resp = await axios.get(`${protocol}${base}/twilio`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return resp;
    } catch(e) {
      console.log(e);
    }
  },

  fetchCurrentUser: async (token) => {
    try {
      const resp = await axios.get(`${protocol}${base}/users/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return resp;
    } catch(e) {
      console.log(e);
    }
  }
}

export default API;
