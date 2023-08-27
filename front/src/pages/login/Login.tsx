import "./login.scss";
import { useState, useContext } from "react";
import { useNavigate,  } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// type Props = {
//   initialState: { email: string; password: string };
// };

const Login = () => {
  const [credentials, setCredentials] = useState({
    email:String,
    password:String
  }); // Fix here

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login/",
        credentials
      );

      console.log(res.data.details.img);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
     setTimeout(() => {
       navigate("/");
       window.location.reload();
     }, 0);
    } catch (err: any) {
      console.log(err);
      dispatch({ type: "LOGIN_ERROR", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <h1>Welcome to Your Admin DashBoard</h1>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="lContainer">
            <input
              type="text"
              placeholder="email"
              id="email"
              className="linput"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="linput"
            />
            <button type="submit" className="lButton">Login</button> {/* Use 'submit' type */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
