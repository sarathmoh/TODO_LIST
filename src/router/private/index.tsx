import { lazy } from "react";
const Home = lazy(() => import("../../pages/home"));
const PrivateRoutes = [
  {
    path: "",
    name: "home",
    element: <Home />,
    isIndex: true,
  },
];

export default PrivateRoutes;
