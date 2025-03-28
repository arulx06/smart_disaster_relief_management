import axios from "axios";

const API_URL = "http://localhost:3001/api";

// Fetch disasters (existing function)
export const fetchDisasters = async (search = "", filter = {}, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}/disasters`, {
      params: { search, filter: JSON.stringify(filter), offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching disasters:", error);
    return [];
  }
};

// Fetch resources (new function)
export const fetchResources = async (search = "", filter = {}, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}/resources`, {
      params: { search, filter: JSON.stringify(filter), offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
};

// Fetch relief-teams (new function)
export const fetchReliefTeams = async (search = "", filter = {}, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}/relief-teams`, {
      params: { search, filter: JSON.stringify(filter), offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching relief-teams:", error);
    return [];
  }
};

// Fetch resource allocations
export const fetchResourceAllocations = async (search = "", filter = {}, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}/resource-allocations`, {
      params: { search, filter: JSON.stringify(filter), offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching resource allocations:", error);
    return [];
  }
};


// Add a new resource
export const addResource = async (resourceData) => {
  try {
    const response = await axios.post(`${API_URL}/resources`, resourceData);
    return response.data;
  } catch (error) {
    console.error("Error adding resource:", error);
    return null;
  }
};

// Update an existing resource
export const updateResource = async (id, resourceData) => {
  try {
    const response = await axios.put(`${API_URL}/resources/${id}`, resourceData);
    return response.data;
  } catch (error) {
    console.error("Error updating resource:", error);
    return null;
  }
};

// Delete a resource
export const deleteResource = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting resource:", error);
    return null;
  }
};

// Add a new disaster
export const addDisaster = async (disasterData) => {
  try {
    const response = await axios.post(`${API_URL}/disasters`, disasterData);
    console.log("Disaster added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding disaster:", error.response?.data || error.message);
    throw error;  // This ensures the error is properly handled in `handleAdd`
  }
};


// Update a disaster
export const updateDisaster = async (id, disasterData) => {
  try {
    const response = await axios.put(`${API_URL}/disasters/${id}`, disasterData);
    return response.data;
  } catch (error) {
    console.error("Error updating disaster:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to update disaster");
  }
};


// Delete a disaster
export const deleteDisaster = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/disasters/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting disaster:", error);
    return null;
  }
};

// Add a new relief-teams
export const addReliefTeams = async (reliefteamsData) => {
  try {
    const response = await axios.post(`${API_URL}/relief-teams`, reliefteamsData);
    return response.data;
  } catch (error) {
    console.error("Error adding relief-teams:", error);
    return null;
  }
};

// Update an existing relief-teams
export const updateReliefTeams = async (id, reliefteamsData) => {
  try {
    const response = await axios.put(`${API_URL}/relief-teams/${id}`, reliefteamsData);
    return response.data;
  } catch (error) {
    console.error("Error updating relief-teams:", error);
    return null;
  }
};

// Delete a relief-teams
export const deleteReliefTeams = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/relief-teams/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting relief-teams:", error);
    return null;
  }
};

// Fetch logged-in user's profile
export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found.");

    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};


// Add a new resource allocation
export const addResourceAllocation = async (allocationData) => {
  try {
    const response = await axios.post(`${API_URL}/resource-allocations`, allocationData);
    return response.data;
  } catch (error) {
    console.error("Error adding resource allocation:", error);
    return null;
  }
};

// Update an existing resource allocation
export const updateResourceAllocation = async (id, allocationData) => {
  try {
    const response = await axios.put(`${API_URL}/resource-allocations/${id}`, allocationData);
    return response.data;
  } catch (error) {
    console.error("Error updating resource allocation:", error);
    return null;
  }
};

// Delete a resource allocation
export const deleteResourceAllocation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/resource-allocations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting resource allocation:", error);
    return null;
  }
};

export const fetchRoleRequests = async () => {
  const response = await fetch(`${API_URL}/role-requests`);
  return response.json();
};

export const approveRoleRequest = async (id) => {
  const response = await fetch(`${API_URL}/role-requests/approve/${id}`, {
    method: "PUT",
  });
  return response.json();
};

export const rejectRoleRequest = async (id) => {
  const response = await fetch(`${API_URL}/role-requests/reject/${id}`, {
    method: "PUT",
  });
  return response.json();
};
