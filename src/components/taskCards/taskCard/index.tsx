import React, { useEffect, useState } from "react";
import { getTasks, deleteItem, filterApi } from "../../../api/todoApi";
import { getUsers } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import TaskList from "../taskList";
import TaskFilter from "../taskCardFilter";
import TaskSort from "../taskSort";
import useDebounce from "../../../utils/customHooks/useDebounce";
import Loader from "../../loader";
import { toast } from "react-toastify";

const TaskCard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [assignedUser, setAssignedUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const [sort, setSort] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const debounceSearchTerm = useDebounce(searchTerm, 300);

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
        const filters = {
          status,
          assignedUser,
          _sort: sortBy,
          title: debounceSearchTerm,
        };
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
  }, [status, assignedUser, sort, debounceSearchTerm]);

  const openDeleteModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteItem(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully ");
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

  const sortHandler = (value:string) => {
    switch (value) {
      case "dueDate-asc":
        setSortBy("dueDate");
        break;

      case "title-asc":
        setSortBy("title");
        break;

      case "dueDate-desc":
        setSortBy("-dueDate");
        break;

      case "title-desc":
        setSortBy("-title");
        break;
    }

    setSort((prev) => !prev);
  };

  if (loadingTasks) return <Loader />;
  if (tasks.length === 0)
    return <div className="text-center mt-4">Sorry no task found </div>;
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
      <TaskSort onSortChange={sortHandler} />

      <div className="w-full max-w-sm mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 mb-5 focus:ring-blue-500 focus:outline-none"
        />
      </div>

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
