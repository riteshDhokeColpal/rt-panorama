import axios from 'axios';

// Set the base URL for axios requests
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3008/assists', // Adjust this as needed for your server setup
});

// Fetch an assist by member UUID
export const fetchAssistByMemberUuid = async (uuid) => {
  try {
    const response = await axiosInstance.get(`/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching assist with member UUID ${uuid}:`, error);
    throw error;
  }
};

// Create a new assist
export const createAssist = async (assistData) => {
  try {
    const response = await axiosInstance.post('/', assistData);
    return response.data;
  } catch (error) {
    console.error('Error creating a new assist:', error);
    throw error;
  }
};

// Update an assist by assist ID
export const updateAssist = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating assist with ID ${id}:`, error);
    throw error;
  }
};

// Delete an assist by assist ID
export const deleteAssist = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting assist with ID ${id}:`, error);
    throw error;
  }
};
