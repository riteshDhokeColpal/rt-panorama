import axios from 'axios';

// Set the base URL for axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3008/users', // Adjust the URL as needed for your server setup
});

// Fetch all members
export const fetchAllMembers = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all members:', error);
    throw error;
  }
};

// Fetch a single member by UUID
export const fetchMemberByUuid = async (uuid) => {
  try {
    const response = await axiosInstance.get(`/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching member with UUID ${uuid}:`, error);
    throw error;
  }
};

// Create a new member
export const createMember = async (memberData) => {
  try {
    const response = await axiosInstance.post('/', memberData);
    return response.data;
  } catch (error) {
    console.error('Error creating a new member:', error);
    throw error;
  }
};

// Update a member by UUID
export const updateMember = async (uuid, updatedData) => {
  try {
    const response = await axiosInstance.put(`/\${uuid}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating member with UUID \${uuid}:`, error);
    throw error;
  }
};

// Delete a member by UUID
export const deleteMember = async (uuid) => {
  try {
    const response = await axiosInstance.delete(`/\${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting member with UUID \${uuid}:`, error);
    throw error;
  }
};