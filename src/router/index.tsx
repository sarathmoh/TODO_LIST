import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Login = lazy(() => import("../pages/auth/login"));
const PageNotFound = lazy(() => import("../components/pageNotFound"));
const Layout = lazy(() => import("../components/layout"));

import PrivateRoutes from "./private";
// import PublicRoutes from "./public";

const AppRoutes = () => {
  return (
    <Suspense fallback={<h1>Hello</h1>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/home" element={<Layout />}>
            {PrivateRoutes.map((route) => {
              return (
                <Route
                  index={route.isIndex}
                  key={route.name}
                  element={route.element}
                  path={route.path}
                />
              );
            })}
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
