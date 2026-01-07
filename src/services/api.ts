const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      const error: any = new Error(errorData.message || `Error: ${response.statusText}`);
      error.response = { data: errorData, status: response.status };
      throw error;
    }

    return response.json();
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      const error: any = new Error(errorData.message || `Error: ${response.statusText}`);
      error.response = { data: errorData, status: response.status };
      throw error;
    }

    return response.json();
  },

  put: async <T>(endpoint: string, data: any): Promise<T> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      const error: any = new Error(errorData.message || `Error: ${response.statusText}`);
      error.response = { data: errorData, status: response.status };
      throw error;
    }

    return response.json();
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  }
};

