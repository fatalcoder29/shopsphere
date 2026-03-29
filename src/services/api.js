import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (data) => API.post('/accounts/register/', data);
export const loginUser = (data) => API.post('/accounts/login/', data);
export const getProducts = () => API.get('/products/');
export const getProduct = (id) => API.get(`/products/${id}/`);
export const getOrders = () => API.get('/orders/');
export const placeOrder = (data) => API.post('/orders/place/', data);

export default API;