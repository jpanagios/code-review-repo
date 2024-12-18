import api from "./axios";

export const getUserProfileData = async () => {
  try {
    const response = await api.get("/Profile");
    return response.data; 
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};