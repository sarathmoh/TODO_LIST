import { lazy } from "react";
const Home = lazy(() => import("../../pages/home"));
const AddTaskPage = lazy(() => import("../../pages/taskPage"));
const EditTask = lazy(() => import("../../pages/editTask"));
const PrivateRoutes = [
  {
    path: "",
    name: "home",
    element: <Home />,
    isIndex: true,
  },
  {
    path: "add",
    name: "add",
    element: <AddTaskPage />,
  },
  {
    path: "edit/:id",
    name: "edit",
    element: <EditTask />,
  },
];

export default PrivateRoutes;
