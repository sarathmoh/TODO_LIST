import AddTask from "../../components/taskForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditTaskPage = () => {
  const { id: taskId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    toast.success("Task updated successfully");
    navigate("/home");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div>
      <AddTask
        taskId={taskId}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditTaskPage;
