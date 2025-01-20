import React from "react";

interface Props {
  status: string;
  assignedUser: string;
  users: any[];
  onFilterChange: (filters: { status: string; assignedUser: string }) => void;
}

const TaskFilter: React.FC<Props> = ({
  status,
  assignedUser,
  users,
  onFilterChange,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: e.target.value, assignedUser });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status, assignedUser: e.target.value });
  };

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={status}
        onChange={handleStatusChange}
        className="p-2 border rounded"
      >
        <option value="">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="inProgress">InProgress</option>
        <option value="done">done</option>
      </select>

      <select
        value={assignedUser}
        onChange={handleUserChange}
        className="p-2 border rounded"
      >
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
