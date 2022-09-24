import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

/* Authentication */
import { useToken } from "../auth/useToken";

import { getRoute } from "../Routes";

const SignUpPage = () => {
  const [token, setToken] = useToken(null);
  const [errorMessages, setErrorMessages] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const history = useHistory();

  const onLoginClicked = () => {
    history.push(getRoute("login"));
  };

  const onRegisterClicked = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      history.push(getRoute("home"));
    } catch (err) {
      setErrorMessages(err.message);
    }
  };

  return (
    <div className="content-container">
      <h1>Sing Up Page</h1>
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
      <input
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        type="password"
        placeholder="password"
      />
      <hr />
      <button
        disable={
          !email ||
          !password ||
          !passwordConfirm ||
          password !== passwordConfirm
        }
        type="submit"
        onClick={onRegisterClicked}
      >
        Register
      </button>
      <button
        disable={
          !email ||
          !password ||
          !passwordConfirm ||
          password !== passwordConfirm
        }
        onClick={onLoginClicked}
      >
        You have an account already? Login
      </button>
    </div>
  );
};

export default SignUpPage;
