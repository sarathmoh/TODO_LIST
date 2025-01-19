import { useState } from "react";
import { addItem } from "../../api/todoApi";
 

const useAddTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return { createTask, loading, error };
};

export default useAddTask;
