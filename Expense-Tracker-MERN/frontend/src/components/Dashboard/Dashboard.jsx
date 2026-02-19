import React, { useState, useEffect } from "react";
import axios from "axios";
import AddExpense from "../Expenses/AddExpense";
import ExpenseList from "../Expenses/ExpenseList";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const monthlyTotal = thisMonth.reduce((sum, e) => sum + Number(e.amount), 0);

  const handleAdd = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((e) => e._id !== id));
  };

  if (loading) return <div className="loading">Loading expenses...</div>;

  return (
    <div>
      <div className="dashboard-header">
        <h2 className="dashboard-title">💼 Dashboard</h2>
        <span style={{ color: "#8892a4", fontSize: "0.9rem" }}>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value red">
            ₹{totalExpenses.toLocaleString("en-IN")}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">This Month</div>
          <div className="stat-value purple">
            ₹{monthlyTotal.toLocaleString("en-IN")}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Entries</div>
          <div className="stat-value green">{expenses.length}</div>
        </div>
      </div>

      {/* Add Form */}
      <AddExpense onAdd={handleAdd} />

      {/* List */}
      <div className="card" style={{ padding: "24px" }}>
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
