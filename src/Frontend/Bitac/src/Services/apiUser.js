import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/users'; // Cambia según tu backend.

export const fetchUsers = async (token) => {
    const response = await axios.get(`${API_BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const registerUser = async (userData, token) => {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateUser = async (identifier, userData, token) => {
    const response = await axios.put(`${API_BASE_URL}/${identifier}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteUser = async (identifier, token) => {
    const response = await axios.delete(`${API_BASE_URL}/${identifier}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};