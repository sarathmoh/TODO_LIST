import AddTask from "../../components/taskForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTaskPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    toast.success("Task successfully added");
    navigate("/home");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div>
      <AddTask onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddTaskPage;
