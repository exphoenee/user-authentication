import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const VerifyEmailPage = () => {
  const history = useHistory();

  useEffect(() => {
    const interval = setTimeout(() => {
      const token = window.location.search.split("=")[1];
      if (token) {
        history.push("/verifyemail");
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [history]);

  return (
    <div>
      <h1>Thank you for signing up!</h1>
      <p>A verification email has been sent!</p>
    </div>
  );
};
