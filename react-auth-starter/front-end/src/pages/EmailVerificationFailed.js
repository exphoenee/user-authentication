import React from "react";
import { useHistory } from "react-router-dom";

import { getRoute } from "../Routes";

export const EmailVerificationFailed = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(getRoute("home"));
  };

  return (
    <div>
      <h1>Sorry, we couldn't verify your email.</h1>
      <button onClick={handleRedirect}>Go to Home</button>
    </div>
  );
};
