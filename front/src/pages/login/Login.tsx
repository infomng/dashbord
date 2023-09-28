import "./login.scss";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: String,
    password: String,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login/",
        credentials
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 0);
    } catch (err: any) {
      console.log(error);
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
              required
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="linput"
              required
            />
            <button type="submit" className="lButton">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
