import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});



// get all expenses
export const getExpenses = () => API.get("/expense/");
export const getExpenseDetail = (slug) => API.get(`/expense/${slug}`);
export const getCategories = () => axios.get("http://127.0.0.1:8000/categories/");
