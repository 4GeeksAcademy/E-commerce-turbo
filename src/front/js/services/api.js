
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Asegúrate de que coincida con el backend Flask

// Ejemplo: Registrar un Usuario
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Ejemplo: Iniciar Sesión
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

// Añade más funciones según las rutas disponibles en tu backend
