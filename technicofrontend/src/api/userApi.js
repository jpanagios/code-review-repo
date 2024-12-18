import api from "./axios";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/all");
    const users = response.data?.$values || []; 
    console.log("Ανάκτηση όλων των χρηστών:", users);
    return users;
  } catch (error) {
    console.error("Σφάλμα κατά την ανάκτηση όλων των χρηστών:", error);
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    const user = response.data; 
    console.log("Ανάκτηση χρήστη:", user);
    return user;
  } catch (error) {
    console.error("Σφάλμα κατά την ανάκτηση χρήστη:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/delete-user/${id}`);
    console.log(`Χρήστης με ID ${id} διαγράφηκε επιτυχώς.`);
    return response.data;
  } catch (error) {
    console.error("Σφάλμα κατά τη διαγραφή χρήστη:", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/edit-user/${id}`, userData);
    console.log(`Χρήστης με ID ${id} ενημερώθηκε επιτυχώς.`);
    return response.data;
  } catch (error) {
    console.error("Σφάλμα κατά την ενημέρωση χρήστη:", error);
    throw error;
  }
};
