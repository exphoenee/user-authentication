import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { getRoute } from "../Routes";

const ForgotPasswordPage = () => {
  const [errorMessages, setErrorMessages] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("bozzay.viktor@gmail.com");
  const history = useHistory();

  const onPasswordResetClicked = async () => {
    try {
      await axios.put(`http://localhost:8080/api/forgot-password/${email}`);
      setSuccess(true);
      console.log("success");
      setTimeout(() => {
        history.push(getRoute("login"));
      }, 3000);
    } catch (err) {
      setErrorMessages(err.message);
    }
  };

  // TODO: itt nem műxik a success
  return success ? (
    <div className="content-container">
      <h1>Success</h1>
      <p>Check your email for reset link!</p>
    </div>
  ) : (
    <div className="content-container">
      <h1>Forgot password</h1>
      <p>Enter your mail we'll send yo a reset link!</p>
      {errorMessages && <p className="fail">{errorMessages}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="someone@email.com"
      />
      <button disabled={!email} onClick={onPasswordResetClicked}>
        Send reset link
      </button>
    </div>
  );
};

export default ForgotPasswordPage;
