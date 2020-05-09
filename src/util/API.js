import axios from 'axios';

const API = {
  createSession: (params) => {
    return axios.post(`${PROTOCOL}://${API_URL}/authenticate`, params);
  },

  createAccount: (params) => {
    return axios.post(`${PROTOCOL}://${API_URL}/users`, params);
  },

  fetchTwilioConfig: (token) => {
    return axios.get(`${PROTOCOL}://${API_URL}/twilio`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchCurrentUser: (token) => {
    return axios.get(`${PROTOCOL}://${API_URL}/users/current`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchUsers: (token) => {
    return axios.get(`${PROTOCOL}://${API_URL}/current_user/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchOnlineStatuses: (token) => {
    return axios.get(`${PROTOCOL}://${API_URL}/current_user/online_statuses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchConversations: (token) => {
    return axios.get(`${PROTOCOL}://${API_URL}/current_user/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  findOrCreateConversation: (token, params) => {
    return axios.post(`${PROTOCOL}://${API_URL}/current_user/conversations`, params, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  readConversation: (token, id) => {
    return axios.patch(`${PROTOCOL}://${API_URL}/current_user/conversations/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchMessages: (token, id) => {
    return axios.get(`${PROTOCOL}://${API_URL}/current_user/conversations/${id}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  createMessage: (token, id, params) => {
    return axios.post(`${PROTOCOL}://${API_URL}/current_user/conversations/${id}/messages`, params, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
}

export default API;
