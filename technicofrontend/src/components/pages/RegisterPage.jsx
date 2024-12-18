import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    vatNumber: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      console.log("Submitting registration data:", formData);
      const response = await register(formData);
      console.log("Registration response:", response);

      if (response.id) {
        localStorage.setItem("userId", response.id);
        console.log("User ID αποθηκεύτηκε:", response.id);

        alert("Η εγγραφή ήταν επιτυχής!");
        navigate("/home"); 
      } else {
        throw new Error("Το backend δεν επέστρεψε user ID.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(
        error.response?.data?.message || "Η εγγραφή απέτυχε. Προσπαθήστε ξανά."
      );
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-left">
        <img
          src={require("../../assets/first_page.png")}
          alt="Εγγραφή"
          className="register-page-image"
        />
      </div>
      <div className="register-page-right">
        <div className="register-page-form-container">
          <h2>Εγγραφή</h2>
          {error && <p className="register-page-error">{error}</p>}
          <form className="register-page-form" onSubmit={handleSubmit}>
            <label className="register-page-label" htmlFor="firstName">
              Όνομα:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="lastName">
              Επώνυμο:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="phoneNumber">
              Τηλέφωνο:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="email">
              Email:
            </label>
            <input
              className="register-page-input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="password">
              Κωδικός:
            </label>
            <input
              className="register-page-input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="vatNumber">
              ΑΦΜ:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="vatNumber"
              name="vatNumber"
              value={formData.vatNumber}
              onChange={handleChange}
              required
            />
            <button className="register-page-button" type="submit">
              Εγγραφή
            </button>
          </form>
          <p className="register-page-link">
            Έχετε ήδη λογαριασμό;{" "}
            <a href="/login" className="register-page-login-link">
              Συνδεθείτε εδώ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
