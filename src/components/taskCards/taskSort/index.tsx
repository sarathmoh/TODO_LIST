import React from "react";

const sortOptions = [
  { value: "dueDate", label: "Sort by Due Date" },
  { value: "title", label: "Sort by Title" },
];

interface TaskSortProps {
  sortBy: string;
  onSortChange: (sortCriteria: string) => void;
}

const TaskSort: React.FC<TaskSortProps> = ({ sortBy, onSortChange }) => (
  <select
    value={sortBy}
    onChange={(e) => onSortChange(e.target.value)}
    className="p-2 border rounded mb-4"
  >
    {sortOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default TaskSort;
