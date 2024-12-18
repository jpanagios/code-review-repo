import React from "react";

function RegisterForm() {
  return (
    <form>
      <label>VAT Number:</label>
      <input type="text" name="vat" required />
      <label>Name:</label>
      <input type="text" name="name" required />
      <label>Surname:</label>
      <input type="text" name="surname" required />
      <label>Address:</label>
      <input type="text" name="address" required />
      <label>Phone Number:</label>
      <input type="text" name="phone" required />
      <label>Email:</label>
      <input type="email" name="email" required />
      <label>Password:</label>
      <input type="password" name="password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
