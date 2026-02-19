import React from "react";
import axios from "axios";

const ExpenseList = ({ expenses, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      onDelete(id);
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <h3>📋 Recent Expenses</h3>
        <div className="empty-state">
          <div className="empty-icon">💸</div>
          <p>No expenses yet. Add your first one above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h3>📋 Recent Expenses</h3>
      {expenses.map((expense) => (
        <div key={expense._id} className="expense-item">
          <div className="expense-info">
            <div className="expense-title">{expense.title}</div>
            <div className="expense-meta">
              <span className="expense-category">{expense.category}</span>
              <span className="expense-date">
                {new Date(expense.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              {expense.description && (
                <span style={{ fontSize: "0.78rem", color: "#8892a4" }}>
                  {expense.description}
                </span>
              )}
            </div>
          </div>
          <span className="expense-amount">
            ₹{Number(expense.amount).toLocaleString("en-IN")}
          </span>
          <button
            id={`btn-delete-${expense._id}`}
            className="btn btn-danger"
            onClick={() => handleDelete(expense._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
