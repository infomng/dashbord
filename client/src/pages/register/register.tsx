import React, { useState, ChangeEvent, FormEvent } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (name === "confirmPassword" && value !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    } else {
      validationErrors.confirmPassword = "";
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors(validationErrors);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };
 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      alert("Form submitted successfully");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <span className="title">Register</span>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.username && <span>{errors.username}</span>}
        </div>
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
              name="password"
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
