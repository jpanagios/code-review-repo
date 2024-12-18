import React from "react";

function RepairForm() {
  return (
    <form>
      <label>Repair Date:</label>
      <input type="date" name="date" required />
      <label>Type of Repair:</label>
      <select name="type" required>
        <option value="Painting">Painting</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
        <option value="Insulation">Insulation</option>
      </select>
      <label>Description:</label>
      <textarea name="description" required></textarea>
      <label>Address:</label>
      <input type="text" name="address" required />
      <label>Status:</label>
      <select name="status" required>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Save Repair</button>
    </form>
  );
}

export default RepairForm;
