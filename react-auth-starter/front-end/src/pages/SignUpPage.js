import { useState } from "react";
import { useHistory } from "react-router-dom";

export const SignUpPage = () => {
  const [errorMessages, setErrorMessages] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const history = useHistory();

  const onLoginClicked = () => {
    history.push("/login");
  };
  const onRegisterClicked = () => {};

  return (
    <div className="content-container">
      <h1>Sing Up Page</h1>
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
      <input
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        type="password"
        placeholder="password"
      />
      <hr />
      <button
        disable={
          !username ||
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
          !username ||
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
