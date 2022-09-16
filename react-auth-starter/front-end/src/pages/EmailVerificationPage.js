import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from "./../auth/useToken";

export const VerifyEmailPage = () => {
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
