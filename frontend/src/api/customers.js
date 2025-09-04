import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export function getCustomers(token) {
  return axios.get(`${API_BASE}/customers`, { headers: { Authorization: `Bearer ${token}` } });
}

export function getCustomer(id, token) {
  return axios.get(`${API_BASE}/customers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export function createCustomer(data, token) {
  return axios.post(`${API_BASE}/customers`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export function updateCustomer(id, data, token) {
  return axios.put(`${API_BASE}/customers/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export function deleteCustomer(id, token) {
  return axios.delete(`${API_BASE}/customers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}
