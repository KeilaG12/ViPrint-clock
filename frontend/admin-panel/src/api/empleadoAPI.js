// /frontend/admin-panel/src/api/empleadoAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/empleados';

export const getEmpleados = () => axios.get(API_URL);
export const getEmpleadoById = (id) => axios.get(`${API_URL}/${id}`);
export const createEmpleado = (empleadoData) => axios.post(API_URL, empleadoData);
export const updateEmpleado = (id, empleadoData) => axios.put(`${API_URL}/${id}`, empleadoData);
export const deleteEmpleado = (id) => axios.delete(`${API_URL}/${id}`);