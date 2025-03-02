import axios from 'axios';

// Set the base URL for axios requests
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3008/master-skills', // Adjust this as needed for your server setup
});

// Fetch all projects
export const fetchAllMasterSkills = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all master skills:', error);
    throw error;
  }
};

// Fetch a single Skill by UUID
export const fetchMasterSkillsByUuid = async (uuid) => {
  try {
    const response = await axiosInstance.get(`/\${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching master skills with UUID \${uuid}:`, error);
    throw error;
  }
};

// Create a new skills
export const createMasterSkills = async (masterSkillsData) => {
  try {
    const response = await axiosInstance.post('/', masterSkillsData);
    return response.data;
  } catch (error) {
    console.error('Error creating a new master skills:', error);
    throw error;
  }
};

// Update a master skills by UUID
export const updateMasterSkills = async (uuid, updatedData) => {
  try {
    const response = await axiosInstance.put(`/\${uuid}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating master skills with UUID \${uuid}:`, error);
    throw error;
  }
};

// Delete a master skills by UUID
export const deleteMasterSkills = async (uuid) => {
  try {
    const response = await axiosInstance.delete(`/\${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting master skills with UUID \${uuid}:`, error);
    throw error;
  }
};


export const getMemberByMasterSkills = async (uuid) => {
    try {
      const response = await axiosInstance.get(`/members-by-skill/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting master skills with UUID ${uuid}:`, error);
      throw error;
    }
  };