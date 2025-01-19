import React from "react";
import { useNavigate } from "react-router-dom";
import AddTask from "../../components/taskForm";
import useAddTask from "../../utils/customHooks/useAddTask";
import { toast } from "react-toastify";

const AddTaskPage: React.FC = () => {
  const { createTask, loading, error } = useAddTask();
  const navigate = useNavigate();

  const handleTaskSubmit = async (task: any) => {
    try {
      const result = await createTask(task);
      toast.success("Task successfully added");
      navigate("/home");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleCloseForm = () => {
    navigate("/home");
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <AddTask onSubmit={handleTaskSubmit} onClose={handleCloseForm} />
    </div>
  );
};

export default AddTaskPage;
