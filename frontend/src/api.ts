import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getProducts = async () => {
  const response = await api.get('/products/');
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await api.post('/products/', product);
  return response.data;
};

export const getWarehouses = async () => {
  const response = await api.get('/warehouses/');
  return response.data;
};

export const createWarehouse = async (warehouse: any) => {
  const response = await api.post('/warehouses/', warehouse);
  return response.data;
};

export default api;
