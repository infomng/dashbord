import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./forgotPassword.scss";

function ForgotPassword() {
  // const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: String,
  });
    console.log(credentials);

  // axios.defaults.withCredentials = true;  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try{
      const res = await axios.post(
        "http://localhost:8800/api/auth/forgot-password/",
        credentials
      );
console.log(res);
    if (res.data.Status === "Success") {
      alert("The reset link has been sent to you. Please check your email")
      navigate("/login");
    }

  }catch (err) {console.log(err);}
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <span className="title">Reset password</span>
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
        <button type="submit">Submit</button>
        <div>
          Return to{" "}
          <Link style={{ color: "#8884d8" }} to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;


