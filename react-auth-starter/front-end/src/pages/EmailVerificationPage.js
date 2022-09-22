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
  const [_, setToken] = useToken(null);

  //in a useEffect hook, we make a request to the server to verify the email
  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/verify-email`,
          {
            verificationString,
          }
        );
        const { token } = response.data;
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
        console.log(token);
      } catch (error) {
        setIsSuccess(false);
        setIsLoading(false);
        console.log(error);
      }
    };
    loadVerification();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess) return <EmailVerificationFailed />;
  return <EmailVerificationSuccess />;
};
