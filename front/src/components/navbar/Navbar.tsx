import "./navbar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>GD Media</span>
      </div>
      <div className="icons">
        <img src="search.svg" alt="" className="icon" />
        <img src="app.svg" alt="" className="icon" />
        {/* <img src="expand.svg" alt="" className="icon" /> */}
        <div className="notifications">
          <img src="notifications.svg" alt="" />
          <span>1</span>
        </div>
        {user && (
          <div className="user">
            <img src={user?.img} alt="" />
            <span>{user?.firstName}</span>
            <div className="logout">
              <button type="submit" onClick={handleSubmit}>
                LOGOUT
              </button>
            </div>
          </div>
        )}
        <img src="settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
