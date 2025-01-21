import React, { useEffect, useState } from "react";
import { deleteItem, filterApi } from "../../../api/todoApi";
import { getUsers } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import TaskList from "../taskList";
import TaskFilter from "../taskCardFilter";
import TaskSort from "../taskSort";
import useDebounce from "../../../utils/customHooks/useDebounce";
import Loader from "../../loader";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const TaskCard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [assignedUser, setAssignedUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sort, setSort] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const debounceSearchTerm = useDebounce(searchTerm, 300);
  const [pageNo, setPageNo] = useState(0);
  const [pageLimit, setPageLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const filters = {
          status,
          assignedUser,
          _sort: sortBy,
          title: debounceSearchTerm,
          _page: pageNo + 1,
          _per_page: pageLimit,
        };
        const filteredTasks = await filterApi(filters);

        const userResponse = await getUsers();
        const enhancedTasks = filteredTasks.data?.map((task: any) => {
          const user = userResponse?.find(
            (user: any) => user.id === task.assignedUser
          );
          return {
            ...task,
            assignedUserName: user ? user.name : "Unknown User",
          };
        });
        setTotalPages(Math.ceil(filteredTasks?.items / pageLimit));
        setTasks(enhancedTasks);
        setUsers(userResponse);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [status, assignedUser, sort, debounceSearchTerm, pageNo]);

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

  const sortHandler = (value: string) => {
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

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPageNo(selectedItem.selected);
  };

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
          placeholder="Search tasks by title..."
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 mb-5 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {loading ? (
        <Loader />
      ) : tasks.length !== 0 ? (
        <TaskList
          tasks={tasks}
          onDelete={openDeleteModal}
          navigate={navigate}
        />
      ) : (
        <p className="text-center text-red-600">No Tasks Found</p>
      )}
      {tasks.length !== 0 && (
        <div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            onPageChange={handlePageChange}
            containerClassName={
              "flex justify-center items-center space-x-2 mt-4"
            }
            pageClassName={"cursor-pointer p-2 rounded border"}
            pageLinkClassName={"block text-center"}
            activeClassName={"bg-blue-500 text-white"}
            disabledClassName={"bg-gray-300 cursor-not-allowed p-2 rounded-xl"}
          />
        </div>
      )}

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
