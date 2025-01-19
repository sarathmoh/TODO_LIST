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
