import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const adminEmails = ["nick@admin.gr", "mitsos@admin.gr", "stathis@admin.gr"];
  const adminPassword = "admin1";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (adminEmails.includes(email) && password === adminPassword) {
      alert("Καλωσορίσατε, Admin!");
      navigate("/admin");
      return;
    }

    try {
      const response = await login(email, password);
      console.log("Login API Response:", response);

      if (response.message === "Σύνδεση επιτυχής") {
        alert("Σύνδεση επιτυχής!");
        localStorage.setItem("userId", response.id);
        console.log("User ID αποθηκεύτηκε:", response.id);
        navigate("/home");
      } else {
        throw new Error("Σφάλμα σύνδεσης.");
      }
    } catch (error) {
      console.error("Σφάλμα σύνδεσης:", error);
      setError(
        "Η σύνδεση απέτυχε. Ελέγξτε τα στοιχεία σας και προσπαθήστε ξανά."
      );
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-left">
        <img
          src={require("../../assets/first_page.png")}
          alt="Καλωσορίσατε"
          className="login-page-image"
        />
      </div>
      <div className="login-page-right">
        <div className="login-page-form-container">
          <h2>Σύνδεση</h2>
          {error && <p className="login-page-error">{error}</p>}
          <form className="login-page-form" onSubmit={handleSubmit}>
            <label className="login-page-label" htmlFor="email">
              Email:
            </label>
            <input
              className="login-page-input"
              type="email"
              id="email"
              placeholder="Εισάγετε το email σας"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="login-page-label" htmlFor="password">
              Κωδικός:
            </label>
            <input
              className="login-page-input"
              type="password"
              id="password"
              placeholder="Εισάγετε τον κωδικό σας"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-page-button" type="submit">
              Σύνδεση
            </button>
          </form>
          <p className="login-page-link">
            Δεν έχετε λογαριασμό;{" "}
            <a href="/register" className="login-page-register-link">
              Εγγραφείτε εδώ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
