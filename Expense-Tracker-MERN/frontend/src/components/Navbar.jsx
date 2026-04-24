import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        💰 ExpenseTracker
      </Link>
      <div className="navbar-nav">
        {user ? (
          <>
            <span style={{ color: "#8892a4", fontSize: "0.9rem" }}>
              Hi, <strong style={{ color: "#e2e8f0" }}>{user.name}</strong>
            </span>
            <button
              className="btn btn-outline"
              onClick={handleLogout}
              id="btn-logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" id="nav-login">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" id="nav-register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
