import { useState } from "react";
import { useHistory } from "react-router-dom";

export const LoginPage = () => {
  const [errorMessages, setErrorMessages] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onLoginClicked = () => {};
  const onSignUpClicked = () => {
    history.push("/signup");
  };
  const onPasswordForgot = () => {
    history.push("/forgot-password");
  };

  return (
    <div className="content-container">
      <h1>Login Page</h1>
      {errorMessages && <p className="fail">{errorMessages}</p>}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="someone@emila.com"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <hr />
      <button type="submit" onClick={onLoginClicked}>
        Login
      </button>
      <button onClick={onPasswordForgot}>Forgot yout password?</button>
      <button onClick={onSignUpClicked}>Don't have an account? Sign up!</button>
    </div>
  );
};
