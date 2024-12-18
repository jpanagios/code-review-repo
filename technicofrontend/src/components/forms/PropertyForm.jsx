import React from "react";

function PropertyForm({ onSubmit, formData, setFormData, isEditing }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="property-form">
      <h2>{isEditing ? "Επεξεργασία Ιδιοκτησίας" : "Προσθήκη Ιδιοκτησίας"}</h2>
      <label htmlFor="address">Διεύθυνση:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <label htmlFor="city">Πόλη:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <label htmlFor="postalCode">Ταχυδρομικός Κώδικας:</label>
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />
      <label htmlFor="userId">ID Ιδιοκτήτη:</label>
      <input
        type="text"
        id="userId"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        required
      />
      <button type="submit" className="property-submit-button">
        {isEditing ? "Ενημέρωση" : "Προσθήκη"}
      </button>
    </form>
  );
}

export default PropertyForm;
