import { useHistory } from "react-router-dom";

export const EmailVerificationSuccess = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/");
  };

  return (
    <div>
      <h1>Thank you for verifying your email!</h1>
      <button onClick={handleRedirect}>Go to Home</button>
    </div>
  );
};