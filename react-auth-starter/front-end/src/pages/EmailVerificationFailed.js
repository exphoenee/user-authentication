import React from "react";
import { useHistory } from "react-router-dom";

export const EmailVerificationFailed = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/");
  };

  return (
    <div>
      <h1>Sorry, we couldn't verify your email.</h1>
      <button onClick={handleRedirect}>Go to Home</button>
    </div>
  );
};
