import React, { useEffect, useState } from "react";
import { getTasks, deleteItem, filterApi } from "../../../api/todoApi";
import { getUsers } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import TaskList from "../taskList";
import TaskFilter from "../taskCardFilter";
import TaskSort from "../taskSort";

const TaskCard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<string>(""); // Status filter
  const [assignedUser, setAssignedUser] = useState<string>(""); // Assigned user filter
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await getTasks();
        const userResponse = await getUsers();
        const enhancedTasks = taskResponse?.map((task: any) => {
          const user = userResponse?.find(
            (user: any) => user.id === task.assignedUser
          );
          return {
            ...task,
            assignedUserName: user ? user.name : "Unknown User",
          };
        });
        setTasks(enhancedTasks);
        setUsers(userResponse);
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
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const filters = { status, assignedUser };
        const filteredTasks = await filterApi(filters);
        const enhancedTasks = filteredTasks?.map((task: any) => {
          const user = users?.find(
            (user: any) => user.id === task.assignedUser
          );
          return {
            ...task,
            assignedUserName: user ? user.name : "Unknown User",
          };
        });
        setTasks(enhancedTasks);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [status, assignedUser]);

  const openDeleteModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteItem(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setIsModalOpen(false);
    } catch (err: any) {
      setError("Failed to delete task");
      setIsModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const handleFilterChange = (filters: {
    status: string;
    assignedUser: string;
  }) => {
    setStatus(filters.status);
    setAssignedUser(filters.assignedUser);
  };

  if (loadingTasks) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2 text-center">Task List</h1>
      <TaskFilter
        status={status}
        assignedUser={assignedUser}
        users={users}
        onFilterChange={handleFilterChange}
      />
      <TaskSort />

      <TaskList tasks={tasks} onDelete={openDeleteModal} navigate={navigate} />
      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-xl">
              Are you sure you want to delete this task?
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleDelete(taskToDelete!)}
                className="btn text-white font-bold bg-red-600 p-3 rounded-2xl cursor-pointer hover:bg-red-900 mr-4"
              >
                Confirm
              </button>
              <button
                onClick={closeDeleteModal}
                className="btn text-white font-bold bg-gray-600 p-3 rounded-2xl cursor-pointer hover:bg-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
