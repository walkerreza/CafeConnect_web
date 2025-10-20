import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cafes
export const getCafes = async () => {
  const response = await api.get('/cafes');
  return response.data.data;
};

export const getCafeById = async (id: string) => {
  const response = await api.get(`/cafes/${id}`);
  return response.data.data;
};

export const createCafe = async (cafeData: any) => {
  const response = await api.post('/cafes', cafeData);
  return response.data.data;
};

export const updateCafe = async (id: string, cafeData: any) => {
  const response = await api.put(`/cafes/${id}`, cafeData);
  return response.data.data;
};

export const deleteCafe = async (id: string) => {
  const response = await api.delete(`/cafes/${id}`);
  return response.data.data;
};

export default api;
