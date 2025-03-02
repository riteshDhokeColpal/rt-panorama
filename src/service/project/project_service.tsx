import axios from 'axios';

// Set the base URL for axios requests
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3008/project', // Adjust this as needed for your server setup
});

// Fetch all projects
export const fetchAllProjects = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
};

// Fetch a single project by UUID
export const fetchProjectByUuid = async (uuid) => {
  try {
    const response = await axiosInstance.get(`/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with UUID ${uuid}:`, error);
    throw error;
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axiosInstance.post('/', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating a new project:', error);
    throw error;
  }
};

// Update a project by UUID
export const updateProject = async (uuid, updatedData) => {
  try {
    const response = await axiosInstance.put(`/\${uuid}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project with UUID \${uuid}:`, error);
    throw error;
  }
};

// Delete a project by UUID
export const deleteProject = async (uuid) => {
  try {
    const response = await axiosInstance.delete(`/\${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with UUID \${uuid}:`, error);
    throw error;
  }
};

export const fetchProjectMembersByUuid = async (uuid) => {
  try {
    const response = await axiosInstance.get(`/project_members/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with UUID ${uuid}:`, error);
    throw error;
  }
};

export const fetchPastProjectsOfMemberByUUID = async (uuid) => {
  try {
    const response = await axiosInstance.get(`/member_projects/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with UUID ${uuid}:`, error);
    throw error;
  }
};