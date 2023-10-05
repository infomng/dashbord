import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const { id, token } = useParams();

  // axios.defaults.withCredentials = true;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8800/api/auth/reset-password/${id}/${token}`, { password })
      .then((res) => {
         if (Object.keys(errors).length === 0) {
           alert("Form submitted successfully");
         }
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;




// import React from "react";
// import { useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function ResetPassword() {
//   const [password, setPassword] = useState<string>();
//   const navigate = useNavigate();
//   const { id, token } = useParams();

//   // axios.defaults.withCredentials = true;
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     axios
//       .post(`http://localhost:8800/api/auth/reset-password/${id}/${token}`, { password })
//       .then((res) => {
//          if (Object.keys(errors).length === 0) {
//            alert("Form submitted successfully");
//          }
//         if (res.data.Status === "Success") {
//           navigate("/login");
//         }
//       })
//       .catch((err) => console.log(err));
//   };