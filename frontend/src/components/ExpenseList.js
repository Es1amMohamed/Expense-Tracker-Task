import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ category: "", date: "" });

  const fetchExpenses = async () => {
    try {
      let url = "http://127.0.0.1:8000/expense/";
      let params = [];

      if (filters.category) params.push(`category=${filters.category}`);
      if (filters.date) params.push(`date=${filters.date}`);

      if (params.length > 0) {
        url += "?" + params.join("&");
      }

      const res = await axios.get(url);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };


  useEffect(() => {
    fetchExpenses();
  }, [filters]);


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchExpenses();
  };

  return (
    <div>
      <h2>Expenses</h2>

      <form onSubmit={handleFilter} style={{ marginBottom: "20px" }}>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">-- All Categories --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
        />

        <button type="submit">Filter</button>
      </form>

      <Link to="/add-expense">
        <button style={{ marginBottom: "15px" }}>➕ Add Expense</button>
      </Link>

      <Link to="/add-category">
        <button style={{ marginBottom: "15px" }}>➕ Add Category</button>
      </Link>
      
      <Link to="/monthly-report">
        <button style={{ marginBottom: "15px", backgroundColor: "#f0ad4e" }}>
          📊 Monthly Report
        </button>
      </Link>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense.slug}>
              Amount: {expense.amount} | Title:
              <Link to={`/expense/${expense.slug}`}> {expense.title} </Link> | 
              Date: {new Date(expense.date).toLocaleDateString()} | Category:{" "}
              {expense.category_name}
            </li>
          ))
        ) : (
          <p>No expenses yet.</p>
        )}
      </ul>
    </div>
  );
}

export default ExpenseList;
