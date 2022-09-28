import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getRoute } from "./../Routes";
import { useQueryParams } from "./../util/useQueryParams";

const VerifyEmailPage = () => {
  const history = useHistory();

  const { email } = useQueryParams();

  useEffect(() => {
    const interval = setTimeout(() => {
      history.push(getRoute("verify-email"), {
        email: encodeURIComponent(email),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [history, email]);

  return (
    <div>
      <h1>Thank you for signing up! A verification email has been sent!</h1>
    </div>
  );
};

export default VerifyEmailPage;
