import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3008', // Adjust the baseURL as needed
});

// Fetch skills by member UUID
export const fetchMemberSkillsByUuid = async (uuid) => {
  
  try {
    const response = await axiosInstance.get(`/member-skills/member/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching skills for member with UUID ${uuid}:`, error);
    throw error;
  }
};