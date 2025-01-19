import apiClient from ".";
export const getUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
