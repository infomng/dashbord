import './emailVerification.scss'
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";


const EmailVerification = () => {
  const params = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.post("http://localhost:8800/api/auth/verify-email", {
          id: params.id,
          token: params.token,
        });
        console.log(params.token);
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    verify();
  }, [params.id, params.token]);

  return (
    <>
      <div className='verify' >
        Your account has been verified successfully .{" "}
        <Link to="/login" style={{ color: "#8884d8" }}>
          {" "}
          Go to login
        </Link>
      </div>
    </>
  );
};

export default EmailVerification;
