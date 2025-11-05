// api.js
import axios from 'axios';

// IMPORTANT:
// change this IP to the device running node server.js
const BASE_URL = 'http://192.168.0.100:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// create ticket
export const createTicket = (data) => api.post('/tickets', data);

// get single ticket
export const getTicket = (ticketId) => api.get(`/tickets/${ticketId}`);

// get all tickets for a user
export const getUserTickets = (userId) => api.get(`/tickets/user/${userId}`);

// update ticket
export const updateTicket = (ticketId, data) => api.put(`/tickets/${ticketId}`, data);

// delete ticket
export const deleteTicket = (ticketId, userId) =>
  api.delete(`/tickets/${ticketId}`, { data: { user_id: userId } });

export default api;
