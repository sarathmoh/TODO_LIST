import apiClient from ".";

export const getTasks = async () => {
  try {
    const response = await apiClient.get("/todo");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addItem = async (itemData) => {
  try {
    const response = await apiClient.post("/todo", itemData);
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const getSpecificUser = async (id) => {
  try {
    const response = await apiClient.get(`/todo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving todo item:", error);
    throw error;
  }
};

export const updateItem = async (id, itemData) => {
  try {
    const response = await apiClient.put(`/todo/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error("Error updating todo item:", error);
    throw error;
  }
};
