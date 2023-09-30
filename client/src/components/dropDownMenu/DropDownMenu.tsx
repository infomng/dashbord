import "./dropDownMenu.scss";
import { LogOut} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const DropDownMenu = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({ type: "LOGOUT" }), navigate("/login");
  };
  return (
    <div>
      <div className="drop-down-menu" onClick={handleClick}>
        <LogOut size={16} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default DropDownMenu;
