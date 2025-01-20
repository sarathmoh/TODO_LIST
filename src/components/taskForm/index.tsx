import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";
import useTaskFormData from "../../utils/customHooks/useTaskFormData";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  status: yup
    .string()
    .oneOf(["todo", "inProgress", "done"], "Invalid status")
    .required("Status is required"),
  dueDate: yup
    .date()
    .required("Due date is required")
    .min(new Date(), "Due date must be in the future"),
  description: yup.string().required("Description is required"),
  assignedUser: yup.string().required("Assigned User is required"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"], "Invalid priority")
    .optional(),
});

const AddForm = ({
  taskId,
  onSubmit: handleExternalSubmit,
  onCancel: handleExternalCancel,
}: {
  taskId?: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}) => {
  const { userList, taskDetails, loading, error, createTask, updateTask } =
    useTaskFormData(taskId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (taskDetails) {
      reset({
        ...taskDetails,
        dueDate: format(new Date(taskDetails.dueDate), "yyyy-MM-dd"),
      });
    }
  }, [taskDetails, reset]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const formattedData = {
        ...data,
        dueDate: format(new Date(data.dueDate), "yyyy-MM-dd"),
      };

      if (taskId) {
        await updateTask(taskId, formattedData);
      } else {
        await createTask(formattedData);
      }

      if (handleExternalSubmit) handleExternalSubmit(data);
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-6 p-5 border-4 border-red-500">
      <h3 className="text-xl font-bold mb-4">
        {taskId ? "Edit Task" : "Add New Task"}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            {...register("title")}
            id="title"
            className="mt-1 block w-full p-2 border"
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label>Status</label>
          <select
            {...register("status")}
            id="status"
            className="mt-1 block w-full p-2 border"
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label>Due Date</label>
          <input
            {...register("dueDate")}
            type="date"
            id="dueDate"
            className="mt-1 block w-full p-2 border"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            id="description"
            rows={2}
            className="mt-1 block w-full p-2 border"
            placeholder="Enter task description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label>Assigned User</label>
          <select
            {...register("assignedUser")}
            id="assignedUser"
            className="mt-1 block w-full p-2 border"
          >
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.assignedUser && (
            <p className="text-red-500 text-sm mt-1">
              {errors.assignedUser.message}
            </p>
          )}
        </div>

        <div>
          <label>Priority</label>
          <select
            {...register("priority")}
            id="priority"
            className="mt-1 block w-full p-2 border"
          >
            <option value="">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleExternalCancel ? handleExternalCancel : undefined}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            {taskId ? "Update Task" : "Submit Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
