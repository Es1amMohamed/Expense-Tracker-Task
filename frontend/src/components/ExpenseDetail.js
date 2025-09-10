import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExpenseDetail } from "../api";
import axios from "axios";

function ExpenseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    date: "",
    category: ""
  });

  useEffect(() => {
    getExpenseDetail(slug)
      .then((res) => {
        setExpense(res.data);
        setFormData({
          title: res.data.title,
          amount: res.data.amount,
          description: res.data.description,
          date: res.data.date,
          category: res.data.category
        });
      })
      .catch((err) => console.error("Error fetching expense:", err));
  }, [slug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/expense/${slug}/update/`,
        formData
      );
      setExpense(res.data);
      setEditMode(false);
      alert("Expense updated successfully ✅");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/expense/${slug}/update/`);
        alert("Expense deleted ❌");
        navigate("/"); // يرجع لليست بعد المسح
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!expense) return <p>Loading...</p>;

  return (
    <div>
      {!editMode ? (
        <>
          <h2>Expense Detail</h2>
          <p>💰 Amount: {expense.amount}</p>
          <p>🏷 Title: {expense.title}</p>
          <p>📝 Description: {expense.description}</p>
          <p>📅 Date: {new Date(expense.date).toLocaleDateString()}</p>
          <p>📂 Category: {expense.category_name}</p>

          <button onClick={() => setEditMode(true)}>✏️ Edit</button>
          <button onClick={handleDelete}>🗑️ Delete</button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <button type="submit">💾 Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            ❌ Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default ExpenseDetail;
