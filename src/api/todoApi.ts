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
