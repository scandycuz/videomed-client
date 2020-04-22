import axios from 'axios';
import { protocol, base } from 'util/env';

const API = {
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

  createSession: async (params) => {
    try {
      const resp = await axios.post(`${protocol}${base}/authenticate`, params);

      return resp;
    } catch(e) {
      console.log(e);
    }
  }
}

export default API;
