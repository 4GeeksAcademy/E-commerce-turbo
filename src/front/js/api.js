// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const fetchProductById = (id) => axios.get(`${API_URL}/products/${id}`);
export const addToCart = (productId) => axios.post(`${API_URL}/cart`, { productId });
export const fetchCart = () => axios.get(`${API_URL}/cart`);
