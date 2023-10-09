import React, { useState, ChangeEvent, FormEvent } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Perform validation as the user types
    const validationErrors: { [key: string]: string } = { ...errors };

    if (name === "username" && !value.trim()) {
      validationErrors.username = "Username is required";
    } else {
      validationErrors.username = "";
    }

    if (name === "email" && !value.trim()) {
      validationErrors.email = "Email is required";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      validationErrors.email = "Email is not valid";
    } else {
      validationErrors.email = "";
    }

    if (name === "password" && !value.trim()) {
      validationErrors.password = "Password is required";
    } else if (name === "password" && value.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    } else {
      validationErrors.password = "";
    }

    if (name === "confirmPassword" && value !== credentials.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    } else {
      validationErrors.confirmPassword = "";
    }

    setcredentials({
      ...credentials,
      [name]: value,
    });

    setErrors(validationErrors);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://localhost:8800/api/auth/register", credentials);

    alert(
      `A verification email has been sent to ${credentials.email} . Please verify your email`
    );

    navigate("/login");

    if (Object.keys(errors).length === 0) {
      alert(
        `A verification email has been sent to ${credentials.email} . Please verify your email`
      );
      navigate("/login");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <span className="title">Register</span>
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
        <div>
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
        <div>
          <label>Confirm Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              name="confirmPassword"
              placeholder="******"
              onChange={handleChange}
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        <button type="submit">Submit</button>

        <div className="go-login">
          Already have an account?{" "}
          <Link style={{ color: "#8884d8" }} to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
