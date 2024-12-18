import React, { useEffect, useState } from "react";
import { getRepairs, updateRepair } from "../../api/repairApi";
import { getProperties } from "../../api/propertyApi";
import "./ProfilePage.css";

function ProfilePage() {
  const [repairs, setRepairs] = useState([]);
  const [filteredRepairs, setFilteredRepairs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("Current User ID:", userId);

    const fetchData = async () => {
      try {
        const savedProperties =
          JSON.parse(localStorage.getItem(`properties_${userId}`)) || [];
        console.log("Saved Properties from LocalStorage:", savedProperties);

        if (!savedProperties.length) {
          console.log("Fetching properties from API...");
          const propertiesFromApi = await getProperties();
          const userProperties = propertiesFromApi.filter(
            (property) => property.userId === userId
          );
          console.log("Filtered Properties for User:", userProperties);

          setProperties(userProperties);
          localStorage.setItem(
            `properties_${userId}`,
            JSON.stringify(userProperties)
          );
        } else {
          setProperties(savedProperties);
        }

        const savedRepairs =
          JSON.parse(localStorage.getItem(`repairs_${userId}`)) || [];
        console.log("Saved Repairs from LocalStorage:", savedRepairs);

        if (!savedRepairs.length) {
          console.log("Fetching repairs from API...");
          const repairsFromApi = await getRepairs();
          console.log("Repairs fetched from API:", repairsFromApi);

          const userRepairs = repairsFromApi.filter(
            (repair) =>
              repair.userId === userId &&
              savedProperties.some(
                (property) => property.id === repair.propertyId
              )
          );
          console.log("Filtered Repairs for User:", userRepairs);

          setRepairs(userRepairs);
          setFilteredRepairs(userRepairs);
          localStorage.setItem(
            `repairs_${userId}`,
            JSON.stringify(userRepairs)
          );
        } else {
          setRepairs(savedRepairs);
          setFilteredRepairs(savedRepairs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (repairId, newStatus) => {
    try {
      console.log(`Updating repair ID ${repairId} to status: ${newStatus}`);
      const updatedRepairs = repairs.map((repair) =>
        repair.id === repairId ? { ...repair, status: newStatus } : repair
      );

      setRepairs(updatedRepairs);
      setFilteredRepairs(updatedRepairs);
      localStorage.setItem(
        `repairs_${localStorage.getItem("userId")}`,
        JSON.stringify(updatedRepairs)
      );
      console.log("Updated repairs in local storage:", updatedRepairs);

      const repairToUpdate = updatedRepairs.find(
        (repair) => repair.id === repairId
      );
      await updateRepair(repairId, repairToUpdate);
      console.log("Repair status updated in backend.");
    } catch (error) {
      console.error("Error updating repair status:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim();
    setSearchTerm(searchValue);
    console.log("Search Term:", searchValue);

    if (searchValue === "") {
      setFilteredRepairs(repairs);
    } else {
      const filtered = repairs.filter((repair) =>
        repair.propertyId.includes(searchValue)
      );
      setFilteredRepairs(filtered);
      console.log("Filtered Repairs:", filtered);
    }
  };

  return (
    <div className="profile-page-container">
      <h1>Προφίλ Χρήστη</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Αναζήτηση με id..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <div className="profile-table-container">
        <table className="profile-table">
          <thead>
            <tr>
              <th>Διεύθυνση Ιδιοκτησίας</th>
              <th>Είδος Κατασκευής</th>
              <th>Κατάσταση Κατασκευής</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepairs.map((repair) => (
              <tr key={repair.id}>
                <td>
                  {properties.find(
                    (property) => property.id === repair.propertyId
                  )?.address || "Διεύθυνση μη διαθέσιμη"}
                </td>
                <td>{repair.type}</td>
                <td>
                  <select
                    value={repair.status}
                    onChange={(e) =>
                      handleStatusChange(repair.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfilePage;
