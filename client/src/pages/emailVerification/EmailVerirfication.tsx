import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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

  return <div>Email Verification</div>;
};

export default EmailVerification;
