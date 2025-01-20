import React from "react";
import TaskCard from "../../components/taskCards/taskCard";
import { useNavigate } from "react-router-dom";

const HomeContainer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <button
        className="btn text-white font-bold bg-red-600 p-3 rounded-2xl cursor-pointer mt-4 mx-5"
        onClick={() => {
          navigate("/home/add");
        }}
      >
        Add Task
      </button>
     <TaskCard />
    </div>
  );
};

export default HomeContainer;
