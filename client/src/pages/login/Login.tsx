import React, { useState, ChangeEvent, useContext } from "react";
import "./login.scss";

import { useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";




const Login = () => {
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
      email: String,
      password: String,
    });


  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const validationErrors: { [key: string]: string } = { ...errors };

    // Perform validation as the user types
    if (name === "email" && !value.trim()) {
      validationErrors.email = "Email is required";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      validationErrors.email = "Email is not valid";
    } else {
      validationErrors.email = "";
    }

    if (name === "password" && !value.trim()) {
      validationErrors.password = "Password is required";
    } else {
      validationErrors.password = "";
    }

    setCredentials({
      ...credentials,
      [name]: value,
    });

    setErrors(validationErrors);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
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
        navigate("/" );
        location.reload();
     
console.log(res);
    } catch (e) {
  
      dispatch({ type: "LOGIN_ERROR", payload: error });
    }
  };


  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (Object.keys(errors).length === 0) {
  //     alert("Form submitted successfully");
  //   }
  // };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <span className="title">Login</span>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div >
          <label>Password:</label>

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              name="password"
              placeholder="******"
              onChange={handleChange}
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
          {errors.password && <span>{errors.password}</span>}
        </div>

        <button type="submit">Submit</button>
        <div>
          Don't have an account?{" "}
          <Link style={{ color: "#8884d8" }} to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
