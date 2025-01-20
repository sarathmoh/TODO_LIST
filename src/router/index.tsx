import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "../context/authContext";
const Login = lazy(() => import("../pages/auth/login"));
const PageNotFound = lazy(() => import("../components/pageNotFound"));
const Layout = lazy(() => import("../components/layout"));
import PrivateRoutes from "./private";
import Loader from "../components/loader";

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/home"
            element={isAuthenticated ? <Layout /> : <Navigate to="/" />}
          >
            {PrivateRoutes.map((route) => (
              <Route
                key={route.name}
                index={route.isIndex}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
