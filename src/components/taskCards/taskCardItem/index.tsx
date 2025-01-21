import React from "react";

interface TaskItemProps {
  task: any;
  onDelete: (taskId: string) => void;
  navigate: any;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, navigate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
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
            User_No: {task?.assignedUser}
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
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn text-white font-bold bg-red-600 p-3 rounded-2xl cursor-pointer hover:bg-red-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
