import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Έχετε αποσυνδεθεί.");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-link">
          Αρχική Σελίδα
        </Link>
        <button onClick={() => navigate(-1)} className="navbar-link">
          Πίσω
        </button>
        <Link to="/profile" className="navbar-link">
          Προφίλ
        </Link>
        <button onClick={handleLogout} className="navbar-link logout-button">
          Αποσύνδεση
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
