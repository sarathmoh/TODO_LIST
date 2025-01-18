import { AuthProvider } from "./context/authContext";
import AppRoutes from "./router";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ToastContainer/>
    </>
  );
}

export default App;
