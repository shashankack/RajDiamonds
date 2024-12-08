import axiosInstance from './axiosInstance';

// Fetch data for all clients
export const getClientData = async () => {
  try {
    const response = await axiosInstance.get('/client-data/');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

// Fetch details of a specific client by ID
export const getClientDetails = async (clientId) => {
  try {
    const response = await axiosInstance.get(`/client-data/${clientId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for client ${clientId}:`, error);
    throw error;
  }
};

// Create a new client
export const createClient = async (clientData) => {
  try {
    const response = await axiosInstance.post('/client-data/', clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

// Update an existing client by ID
export const updateClient = async (clientId, clientData) => {
  try {
    const response = await axiosInstance.put(`/client-data/${clientId}/`, clientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating client ${clientId}:`, error);
    throw error;
  }
};

// Delete a client by ID
export const deleteClient = async (clientId) => {
  try {
    const response = await axiosInstance.delete(`/client-data/${clientId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting client ${clientId}:`, error);
    throw error;
  }
};