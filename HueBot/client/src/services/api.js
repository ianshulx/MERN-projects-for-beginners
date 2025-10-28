const API_URL = "http://localhost:8080/api";

// Get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
};

// Palette APIs
export const paletteAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/palettes`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  save: async (paletteData) => {
    const response = await fetch(`${API_URL}/palettes`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(paletteData),
    });
    return response.json();
  },

  delete: async (paletteId) => {
    const response = await fetch(`${API_URL}/palettes/${paletteId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};
