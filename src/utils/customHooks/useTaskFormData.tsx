import { useState, useEffect } from "react";
import { getUsers } from "../../api/userApi";
import {
  addItem,
  getSpecificUser,
  updateItem,
} from "../../api/todoApi";

const useTaskFormData = (taskId?: string) => {
  const [userList, setUserList] = useState([]);
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const users = await getUsers();
        setUserList(users.data || []);

        if (taskId) {
          const task = await getSpecificUser(taskId);
          setTaskDetails(task);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId]);

  const createTask = async (task: any) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await addItem(task);
      setLoading(false);
      return newTask;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to add task");
      throw err;
    }
  };

  const updateTask = async (taskId: string, task: any) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await updateItem(taskId, task);
      setLoading(false);
      return updatedTask;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to update task");
      throw err;
    }
  };

  return {
    userList,
    taskDetails,
    loading,
    error,
    createTask,
    updateTask,
  };
};

export default useTaskFormData;
