import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Django backend URL
});

// get all expenses
export const getExpenses = () => API.get("/expense/");

export const getExpenseDetail = (slug) => API.get(`/expense/${slug}`);
// add expense
// export const addExpense = (expenseData) => API.post("/expense/", expenseData);

// delete expense
// export const deleteExpense = (id) => API.delete(`/expense/${id}/`);

// update expense
// export const updateExpense = (id, expenseData) =>
//   API.put(`/expense/${id}/`, expenseData);

// get expense
// export const getExpense = (id) => API.get(`/expense/${id}/`);