import React, { useState } from "react";
import { axios } from "axios";

import { EmailVerificationFailed } from "./EmailVerificationFailed";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { useToken } from "./../auth/useToken";
import { useQueryParams } from "./../util/useQueryParams";

const EmailVerificationCodePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [verificationString, setVerificationString] = useState("");

  const [_, setToken] = useToken(null);
  const { email } = useQueryParams();

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/verify-email",
        {
          email,
          code: verificationString,
        }
      );
      const { token } = response.data;
      setToken(token);
      setIsSuccess(true);
    } catch (err) {
      setIsFailed(true);
    }
  };

  if (isSuccess) return <EmailVerificationSuccess />;
  if (isFailed) return <EmailVerificationFailed />;

  return (
    <div className="content-container">
      <h1>Verify Email</h1>
      <p>Enter the verification code sent to your email!</p>
      <input
        value={verificationString}
        onChange={(e) => setVerificationString(e.target.value)}
        placeholder="Verification Code"
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
export default EmailVerificationCodePage;
