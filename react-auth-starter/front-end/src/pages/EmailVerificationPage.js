import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useToken } from "./../auth/useToken";
import { EmailVerificationFailed } from "./EmailVerificationFailed";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";

export const EmailVerificationPage = () => {
  //states isLoading and isSuccess defined here,
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  //added verification form url parameter
  const verificationString = useParams();

  //gets token form useToken
  const [_, setToken] = useToken;

  //in a useEffect hook, we make a request to the server to verify the email
  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/users/verify-email`,
          {
            verificationString,
          }
        );
        const { token } = response.data;
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        setIsSuccess(false);
        setIsLoading(false);
      }
    };
    loadVerification();
  }, [setToken, verificationString]);

  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess) return <EmailVerificationFailed />;
  return <EmailVerificationSuccess />;
};
