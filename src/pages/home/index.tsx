import React from "react";
import TaskCard from "../../components/taskCard";
import { Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

const HomeContainer: React.FC = () => {
  return (
    <div className="home-container">
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircle />}
        style={{ marginTop: "15px", marginLeft: "15px" }}
      >
        Add Task
      </Button>
      <TaskCard />
    </div>
  );
};

export default HomeContainer;
