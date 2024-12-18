import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../api/userApi";
import "./AdminPage.css";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const filtered = users.filter((user) =>
      user.id.toString().includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      alert("Ο χρήστης διαγράφηκε επιτυχώς!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div>Φόρτωση δεδομένων...</div>;
  }

  return (
    <div className="admin-page-container">
      <h1>Πίνακας Διαχείρισης Χρηστών</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Αναζήτηση με User ID"
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Όνομα</th>
              <th>Πληροφορίες</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>
                    <button
                      className="admin-button-profile"
                      onClick={() =>
                        alert(`Προβολή προφίλ για τον χρήστη με ID: ${user.id}`)
                      }
                    >
                      Προφίλ
                    </button>
                  </td>
                  <td>
                    <button
                      className="admin-button-delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Διαγραφή Χρήστη
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Δεν βρέθηκαν χρήστες με αυτό το User ID.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
