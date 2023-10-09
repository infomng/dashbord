import React, { useState, ChangeEvent, FormEvent } from "react";
import "./resetPassword.scss";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

interface FormData {
  password: string;
}

const Register: React.FC = () => {
  
  const navigate = useNavigate();
  const params = useParams();
  const {id,token} = params;
  const [credentials, setcredentials] = useState<FormData>({
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Perform validation as the user types
    const validationErrors: { [key: string]: string } = { ...errors };

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

    await axios.post(`http://localhost:8800/api/auth/reset-password/${id}/${token}`, credentials);

    if (Object.keys(errors).length === 0) {
      alert("Your password has been updated successfully");
      navigate("/login");
    }
  };
  console.log(Object.keys(errors).length);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <span className="title">Reset Password</span>
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
      </form>
    </div>
  );
};

export default Register;
