import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { getRoute } from "../Routes";

import { useToken } from "./../auth/useToken";

const LoginPage = () => {
  const [token, setToken] = useToken();

  const [errorMessages, setErrorMessages] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onLoginClicked = async () => {
    const response = await axios.post("http://localhost:8080/api/login", {
      email,
      password,
    });
    const { token } = response.data;
    setToken(token);
    history.push(getRoute("home"));
  };

  const onSignUpClicked = () => {
    history.push(getRoute("signup"));
  };
  const onPasswordForgot = () => {
    history.push(getRoute("forgotpassword"));
  };

  return (
    <div className="content-container">
      <h1>Login Page</h1>
      {errorMessages && <p className="fail">{errorMessages}</p>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

export default LoginPage;
