import { lazy } from "react";
const Login=lazy(()=>import("../../pages/auth/login"))
const PublicRoutes = [
    {
      path: "login",
      name: "login",
      element: <Login />,
    }
  ];
  
  export default PublicRoutes;