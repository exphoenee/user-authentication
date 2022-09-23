import React from "react";
import { useState, useEffect } from "react";

const VerifyEmailPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setTimeout(() => {
      const token = window.location.search.split("=")[1];
      if (token) {
        setMessage(
          "Thank you for signing up! A verification email has been sent!"
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmailPage;
