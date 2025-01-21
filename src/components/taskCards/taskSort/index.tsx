import React from "react";

const sortOptions = [
  { value: "title-asc", label: "Sort by Title asc" },
  { value: "dueDate-asc", label: "Sort by Due Date asc" },
  { value: "dueDate-desc", label: "Sort by Due Date desc" },
  { value: "title-desc", label: "Sort by Title desc" },
];

interface TaskSortProps {
  onSortChange: (sortCriteria: string) => void;
}

const TaskSort: React.FC<TaskSortProps> = ({ onSortChange }) => (
  <select
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
