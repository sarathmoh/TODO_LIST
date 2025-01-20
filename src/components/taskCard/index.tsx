import React, { useEffect, useState } from "react";
import { getTasks } from "../../api/todoApi";
import { getUsers } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const TaskCard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await getTasks();
        setTasks(taskResponse);
        setLoadingTasks(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks.");
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await getUsers();
        setUsers(userResponse.data);
        setLoadingUsers(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users.");
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const enhancedTasks = tasks.map((task: any) => {
    const user = users.find(
      (user: any) => String(user.id) === String(task.assignedUser)
    );
    return {
      ...task,
      assignedUserName: user ? user.name : "Unknown User",
    };
  });

  if (loadingTasks || loadingUsers)
    return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2 text-center">Task List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {enhancedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-bold mb-2">{task.title}</h2>
            <p className="text-xl text-gray-600 mb-4">{task.description}</p>
            <div className="flex justify-between items-center">
              <span
                className={`text-lg font-semibold px-2 py-1 rounded ${
                  task.status === "todo"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.status === "inProgress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {task?.status}
              </span>
              <div>
                <span className="text-lg font-semibold text-gray-500">
                  Due: {task.dueDate}
                </span>
                <p className="text-lg text-gray-500 font-semibold">
                  User_No:{task?.assignedUser}
                </p>
              </div>
            </div>
            <p className="text-md text-gray-500 mt-2 font-semibold">
              Assigned to: {task?.assignedUserName}
            </p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => {
                  navigate(`/home/edit/${task.id}`);
                }}
                className="btn text-white font-bold bg-blue-500 p-3 rounded-2xl cursor-pointer hover:bg-blue-900"
              >
                Update
              </button>
              <button className="btn text-white font-bold bg-red-600 p-3 rounded-2xl cursor-pointer hover:bg-red-900">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
