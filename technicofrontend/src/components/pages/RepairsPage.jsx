import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
} from "../../api/repairApi";
import "./RepairsPage.css";

function RepairsPage() {
  const { userId } = useParams();
  const [repairs, setRepairs] = useState(() => {
    const savedRepairs = localStorage.getItem(`repairs_${userId}`);
    return savedRepairs ? JSON.parse(savedRepairs) : [];
  });

  const [formData, setFormData] = useState({
    propertyId: "",
    repairDate: "",
    type: "",
    description: "",
    status: "Pending",
    cost: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (!savedUserId || savedUserId !== userId) {
      console.warn("User ID mismatch or missing in local storage.");
      return;
    }

    if (!repairs.length) {
      const fetchRepairs = async () => {
        try {
          const data = await getRepairs();
          const filteredRepairs = data.filter(
            (repair) => repair.userId === userId
          );
          setRepairs(filteredRepairs);
          localStorage.setItem(
            `repairs_${userId}`,
            JSON.stringify(filteredRepairs)
          );
        } catch (error) {
          console.error("Error fetching repairs:", error);
        }
      };
      fetchRepairs();
    }
  }, [userId, repairs.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateRepair(editId, formData);
        const updatedRepairs = repairs.map((repair) =>
          repair.id === editId ? { ...repair, ...formData } : repair
        );
        setRepairs(updatedRepairs);
        localStorage.setItem(
          `repairs_${userId}`,
          JSON.stringify(updatedRepairs)
        );
      } else {
        const newRepair = await createRepair({ ...formData, userId });
        const updatedRepairs = [...repairs, newRepair];
        setRepairs(updatedRepairs);
        localStorage.setItem(
          `repairs_${userId}`,
          JSON.stringify(updatedRepairs)
        );
      }
      resetForm();
    } catch (error) {
      console.error("Error saving repair:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      propertyId: "",
      repairDate: "",
      type: "",
      description: "",
      status: "Pending",
      cost: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (repair) => {
    setEditMode(true);
    setEditId(repair.id);
    setFormData({
      propertyId: repair.propertyId,
      repairDate: repair.repairDate,
      type: repair.type,
      description: repair.description,
      status: repair.status,
      cost: repair.cost,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteRepair(id);
      const updatedRepairs = repairs.filter((repair) => repair.id !== id);
      setRepairs(updatedRepairs);
      localStorage.setItem(`repairs_${userId}`, JSON.stringify(updatedRepairs));
    } catch (error) {
      console.error("Error deleting repair:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedRepair = repairs.find((repair) => repair.id === id);
      updatedRepair.status = newStatus;

      await updateRepair(id, updatedRepair);

      const updatedRepairs = repairs.map((repair) =>
        repair.id === id ? { ...repair, status: newStatus } : repair
      );
      setRepairs(updatedRepairs);
      localStorage.setItem(`repairs_${userId}`, JSON.stringify(updatedRepairs));
    } catch (error) {
      console.error("Error updating repair status:", error);
    }
  };

  return (
    <div className="repairs-center-container">
      <h1 className="repairs-page-title">'</h1>
      <div className="repairs-form-container">
        <h2>{editMode ? "Επεξεργασία Επισκευής" : "Προσθήκη Επισκευής"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="propertyId"
            placeholder="Κωδικός Ιδιοκτησίας"
            value={formData.propertyId}
            onChange={(e) =>
              setFormData({ ...formData, propertyId: e.target.value })
            }
            required
          />
          <input
            type="date"
            name="repairDate"
            value={formData.repairDate}
            onChange={(e) =>
              setFormData({ ...formData, repairDate: e.target.value })
            }
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="" disabled>
              Επιλέξτε τύπο επισκευής
            </option>
            <option value="Painting">Βαφή</option>
            <option value="Insulation">Μόνωση</option>
            <option value="Frames">Κουφώματα</option>
            <option value="Plumbing">Υδραυλικά</option>
            <option value="Electrical">Ηλεκτρικά</option>
          </select>
          <textarea
            name="description"
            placeholder="Περιγραφή"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
          <input
            type="number"
            name="cost"
            placeholder="Κόστος (σε €)"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            required
          />
          <button type="submit" className="repairs-submit-button">
            {editMode ? "Ενημέρωση" : "Προσθήκη"}
          </button>
        </form>
      </div>

      <div className="repairs-list">
        <h2>Λίστα Επισκευών</h2>
        {repairs.map((repair) => (
          <div key={repair.id} className="repair-item">
            <p>Κωδικός Ιδιοκτησίας: {repair.propertyId}</p>
            <p>Περιγραφή: {repair.description}</p>
            <p>Ημερομηνία: {repair.repairDate}</p>
            <p>Τύπος: {repair.type}</p>
            <p>Κόστος: {repair.cost} €</p>
            <p>
              Κατάσταση:
              <select
                value={repair.status}
                onChange={(e) => handleStatusChange(repair.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </p>
            <button className="edit-button" onClick={() => handleEdit(repair)}>
              Επεξεργασία
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(repair.id)}
            >
              Διαγραφή
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepairsPage;
