import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUsers } from "../../api/userApi";
import { format } from "date-fns";

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

type FormInputs = yup.InferType<typeof schema>;

interface AddTaskFormProps {
  onSubmit: (task: FormInputs) => void;
  onClose: () => void;
}

interface UserInfo {
  id: string;
  name: string;
}

const AddTask: React.FC<AddTaskFormProps> = ({ onSubmit, onClose }) => {
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onFormSubmit: SubmitHandler<FormInputs> = (data) => {
    if (data?.dueDate) {
      const formattedDate = format(new Date(data.dueDate), "yyyy-MM-dd");
      data.dueDate = formattedDate;
    }
    const assignedUsedId = data.assignedUser;
    const formattedData = {
      ...data,
      id: assignedUsedId,

      tags: data.tags || [],
    };
    console.log(formattedData, "heloooo");

    onSubmit(formattedData);
    onClose();
  };

  const getUsersData = async () => {
    try {
      const response = await getUsers();
      setUserList(response?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-6 p-5 border-4 border-red-500">
      <h3 className="text-xl font-bold mb-4">Add New Task</h3>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            {...register("title")}
            id="title"
            className={`mt-1 block w-full p-2 border`}
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
            className={`mt-1 block w-full p-2 border`}
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
            className={`mt-1 block w-full p-2 border`}
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
            className={`mt-1 block w-full p-2 border`}
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
            className={`mt-1 block w-full p-2 border`}
          >
            {userList.map((user) => (
              <option key={user.id} value={user.id.toString()}>
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
            className={`mt-1 block w-full p-2 border`}
          >
            <option value="">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* <div>
          <label>Tags (Comma separated)</label>
          <input
            {...register("tags")}
            id="tags"
            className={`mt-1 block w-full p-2 border`}
            placeholder="Enter tags separated by commas"
          />
        </div> */}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
