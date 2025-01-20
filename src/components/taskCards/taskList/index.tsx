import React from "react";
import TaskCardItem from "../taskCardItem";

interface TaskListProps {
  tasks: any[];
  onDelete: (taskId: string) => void;
  navigate: any;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, navigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCardItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

export default TaskList;
