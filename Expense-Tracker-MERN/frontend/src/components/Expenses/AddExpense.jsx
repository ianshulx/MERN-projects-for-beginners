import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];

const AddExpense = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !amount) {
      toast.error("Title and amount are required");
      return setError("Title and amount are required");
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a positive number");
      return setError("Amount must be a positive number");
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/expenses", {
        title,
        amount: parseFloat(amount),
        category,
        description,
      });
      onAdd(res.data);
      toast.success("Expense added successfully!");
      setTitle("");
      setAmount("");
      setCategory("Other");
      setDescription("");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add expense";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card add-expense-form">
      <h3>➕ Add New Expense</h3>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="exp-title">Title</label>
            <input
              id="exp-title"
              type="text"
              className="form-control"
              placeholder="e.g. Groceries"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exp-amount">Amount (₹)</label>
            <input
              id="exp-amount"
              type="number"
              className="form-control"
              placeholder="e.g. 500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="exp-category">Category</label>
            <select
              id="exp-category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exp-desc">Description (optional)</label>
            <input
              id="exp-desc"
              type="text"
              className="form-control"
              placeholder="Brief note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button
          id="btn-add-expense"
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
