import api from './axios';

export const getRepairs = async () => {
  try {
    const response = await api.get('/Repair');
    const data = response.data;

    const repairs = Array.isArray(data) ? data : data?.$values || [];
    console.log("Fetched repairs:", repairs); 
    return repairs;
  } catch (error) {
    console.error("Error fetching repairs:", error.response?.data || error.message);
    throw error;
  }
};

export const createRepair = async (repair) => {
  try {
    const response = await api.post('/Repair', repair);
    console.log("Created repair:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error creating repair:", error.response?.data || error.message);

    if (error.response && error.response.data && error.response.data.errors) {
      console.error("Validation errors:", error.response.data.errors);
    }

    throw error;
  }
};

export const updateRepair = async (id, repair) => {
  try {
    const response = await api.put(`/Repair/${id}`, repair);
    console.log("Updated repair:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error updating repair:", error.response?.data || error.message);

    if (error.response && error.response.data && error.response.data.errors) {
      console.error("Validation errors:", error.response.data.errors);
    }

    throw error;
  }
};

export const deleteRepair = async (id) => {
  try {
    await api.delete(`/Repair/${id}`);
    console.log("Deleted repair ID:", id); 
  } catch (error) {
    console.error("Error deleting repair:", error.response?.data || error.message);
    throw error;
  }
};