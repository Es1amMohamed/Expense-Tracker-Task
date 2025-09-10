import React, { useState } from "react";
import axios from "axios";

function CategoryCreate() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/categories/", { name });
      console.log("Category Created:", res.data);
      alert("Category Created Successfully!");
      setName("");
    } catch (err) {
      console.error("Error creating category:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <button type="submit">Save Category</button>
      </form>
    </div>
  );
}

export default CategoryCreate;
