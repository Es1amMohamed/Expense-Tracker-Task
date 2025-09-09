import React, { useEffect, useState } from "react";
import { getExpenses } from "../api";
import { Link } from "react-router-dom";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses()
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching expenses:", err);
      });
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense.slug}>
                Amount: {expense.amount} | 
                Title:<Link to={`/expense/${expense.slug}`}> {expense.titele} </Link> | 
                Date: {new Date(expense.date).toLocaleDateString()} | 
                Category: {expense.category_name}
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
