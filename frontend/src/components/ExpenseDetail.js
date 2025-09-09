import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExpenseDetail } from "../api";

function ExpenseDetail() {
  const { slug } = useParams();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    getExpenseDetail(slug)
      .then((res) => setExpense(res.data))
      .catch((err) => console.error("Error fetching expense:", err));
  }, [slug]);

  if (!expense) return <p>Loading...</p>;

  return (
    <div>
      <h2>Expense Detail</h2>
      <p>💰 Amount: {expense.amount}</p>
      <p>🏷 Title: {expense.title}</p>
      <p>📝 Description: {expense.description}</p>
      <p>📅 Date: {new Date(expense.date).toLocaleDateString()}</p>
      <p>📂 Category: {expense.category_name}</p>
    </div>
  );
}

export default ExpenseDetail;
