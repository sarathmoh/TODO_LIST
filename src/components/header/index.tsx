import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import useOnlineStatus from "../../utils/useOnlineStatus";
import online from "../../assets/images/icons8-connection-status-on-96.png";
import offline from "../../assets/images/icons8-offline-96.png";
import UserAvatar from "../avatar";

const Header = () => {
  const status = useOnlineStatus();
  const { currentUser, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between bg-[#FEDFE1] shadow-lg h-16">
      <div
        style={{ display: "flex", alignItems: "center", paddingLeft: "12px" }}
      >
        <UserAvatar name={currentUser?.username || "guest"} />
      </div>
      <div className=" flex items-center">
        <ul className="flex items-center">
          <li className="mx-4">
            {status ? (
              <img src={online} className="w-5" />
            ) : (
              <img src={offline} className="w-5" />
            )}
          </li>
          {isAuthenticated && (
            <li className="mx-4">
              <button
                className="btn text-white font-bold bg-red-600 p-3 rounded-2xl cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
