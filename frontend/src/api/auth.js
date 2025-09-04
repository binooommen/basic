import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export function login(username, password) {
  return axios.post(`${API_BASE}/login`, { username, password });
}

export function register(username, password, name) {
  return axios.post(`${API_BASE}/register`, { username, password, name });
}

export function updateName(name, token) {
  return axios.put(`${API_BASE}/user/name`, { name }, { headers: { Authorization: `Bearer ${token}` } });
}

export function updatePassword(oldPassword, newPassword, token) {
  return axios.put(`${API_BASE}/user/password`, { oldPassword, newPassword }, { headers: { Authorization: `Bearer ${token}` } });
}
