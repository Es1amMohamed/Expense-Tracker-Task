import React, { useState } from "react";
import axios from "axios";

function MonthlyReport() {
  const [month, setMonth] = useState("");
  const [total, setTotal] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://127.0.0.1:8000/reports/monthly/?month=${month}`);
      setTotal(res.data.total_expense);
    } catch (err) {
      console.error(err);
      alert("Error fetching report");
    }
  };

  return (
    <div>
      <h2>Monthly Expense Report</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <button type="submit">Get Report</button>
      </form>
      {total !== null && (
        <p>Total Expense for {month}: 💰 {total}</p>
      )}
    </div>
  );
}

export default MonthlyReport;
