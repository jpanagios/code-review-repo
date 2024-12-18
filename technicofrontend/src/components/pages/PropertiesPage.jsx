import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../../api/propertyApi";
import "./PropertiesPage.css";

function PropertiesPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchAndSyncProperties = async () => {
      try {
        console.log("Fetching properties from API...");
        const apiData = await getProperties();
        const userPropertiesFromApi = apiData.filter(
          (property) => property.userId === userId
        );

        console.log("Properties από API:", userPropertiesFromApi);

        const localData = localStorage.getItem(`properties_${userId}`);
        const localProperties = localData ? JSON.parse(localData) : [];
        console.log("Properties από Local Storage:", localProperties);

        const combinedProperties = [
          ...userPropertiesFromApi,
          ...localProperties.filter(
            (localProp) =>
              !userPropertiesFromApi.some(
                (apiProp) => apiProp.id === localProp.id
              )
          ),
        ];

        console.log("Συγχωνευμένα properties:", combinedProperties);

        localStorage.setItem(
          `properties_${userId}`,
          JSON.stringify(combinedProperties)
        );

        setProperties(combinedProperties);
      } catch (error) {
        console.error(
          "Σφάλμα κατά την ανάκτηση ή συγχώνευση των properties:",
          error
        );
      }
    };

    if (userId) fetchAndSyncProperties();
    else console.error("User ID is missing. Redirecting to login.");
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedProperties;

      if (editMode) {
        await updateProperty(editId, formData);
        updatedProperties = properties.map((property) =>
          property.id === editId ? { ...property, ...formData } : property
        );
      } else {
        const newProperty = await createProperty({ ...formData, userId });
        updatedProperties = [...properties, newProperty];
      }

      setProperties(updatedProperties);
      localStorage.setItem(
        `properties_${userId}`,
        JSON.stringify(updatedProperties)
      );

      resetForm();
    } catch (error) {
      console.error("Σφάλμα κατά την αποθήκευση του property:", error);
    }
  };

  const resetForm = () => {
    setFormData({ address: "", city: "", postalCode: "" });
    setEditMode(false);
    setEditId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);
      const updatedProperties = properties.filter(
        (property) => property.id !== id
      );

      setProperties(updatedProperties);
      localStorage.setItem(
        `properties_${userId}`,
        JSON.stringify(updatedProperties)
      );
    } catch (error) {
      console.error("Σφάλμα κατά τη διαγραφή του property:", error);
    }
  };

  const handleEdit = (property) => {
    setEditMode(true);
    setEditId(property.id);
    setFormData({
      address: property.address,
      city: property.city,
      postalCode: property.postalCode,
    });
  };

  const handleAddRepair = (propertyId) => {
    navigate(`/repairs/${userId}`);
  };

  return (
    <div className="properties-center-container">
      <h1 className="properties-page-title">'</h1>
      <div className="properties-form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Διεύθυνση"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Πόλη"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ταχυδρομικός Κώδικας"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
          />
          <button type="submit" className="properties-submit-button">
            {editMode ? "Ενημέρωση" : "Προσθήκη"}
          </button>
        </form>
      </div>

      <div className="properties-list">
        <h2>Λίστα Ιδιοκτησιών</h2>
        {properties.length === 0 ? (
          <p>Δεν υπάρχουν διαθέσιμες ιδιοκτησίες.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="property-item">
              <p>
                <strong>ID:</strong> {property.id}
              </p>
              <p>
                <strong>Διεύθυνση:</strong> {property.address}
              </p>
              <p>
                <strong>Πόλη:</strong> {property.city}
              </p>
              <p>
                <strong>Ταχ. Κώδικας:</strong> {property.postalCode}
              </p>
              <button
                className="edit-button"
                onClick={() => handleEdit(property)}
              >
                Επεξεργασία
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(property.id)}
              >
                Διαγραφή
              </button>
              <button
                className="add-repair-button"
                onClick={() => handleAddRepair(property.id)}
              >
                Προσθήκη Κατασκευής
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
