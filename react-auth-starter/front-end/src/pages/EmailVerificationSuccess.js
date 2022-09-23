import React from "react";
import { useHistory } from "react-router-dom";

import { getRoute } from "../Routes";

export const EmailVerificationSuccess = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(getRoute("home"));
  };

  return (
    <div>
      <h1>Thank you for verifying your email!</h1>
      <button onClick={handleRedirect}>Go to Home</button>
    </div>
  );
};
