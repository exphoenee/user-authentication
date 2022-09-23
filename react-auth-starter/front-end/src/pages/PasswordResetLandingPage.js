import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PassWordResetFailed from "./PasswordResetFailed";
import PassWordResetSuccess from "./PasswordResetSuccess";

export const PasswordResetLandingPage = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const { passwordResetCode } = useParams();

  const onPasswordResetClicked = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/users/${passwordResetCode}/reset-password`,
        {
          password: passwordValue,
          confirmPassword: confirmPasswordValue,
        }
      );
      setIsSuccess(true);
    } catch (err) {
      setIsFailure(true);
    }
  };

  if (isFailure) return <PassWordResetFailed />;
  if (isSuccess) return <PassWordResetSuccess />;
  return (
    <div className="content-container">
      <h1>Reset password</h1>
      <p>Please enter your new password</p>
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="Confirm password"
      />
      <button
        disabled={
          (!passwordValue || !confirmPasswordValue) &&
          passwordValue !== confirmPasswordValue
        }
        onClick={async () => {
          onPasswordResetClicked();
        }}
      >
        Reset password
      </button>
    </div>
  );
};
