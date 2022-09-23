import React from "react";
import { useHistory } from "react-router-dom";

import { getRoute } from "../Routes";

const PasswordResetFailed = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(getRoute("home"));
  };

  return (
    <div>
      <h1>Password reset successed!</h1>
      <p>You can now loign with your new password.</p>
      <button onClick={handleRedirect}>Go to Home</button>
    </div>
  );
};

export default PasswordResetFailed;
