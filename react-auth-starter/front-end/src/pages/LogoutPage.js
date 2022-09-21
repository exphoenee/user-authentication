import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const LogoutPage = () => {
  const history = useHistory();

  const login = () => {
    history.push("/login");
  };

  useEffect(() => {
    //send a post request to server api/logout to remove the token from the server
    axios.post("http://localhost:8080/api/logout").then((res) => {});
    localStorage.removeItem("token");
  }, []);

  return (
    <div className="content-container">
      <h1>You loged out form the page!</h1>

      <button onClick={login}>Login again?</button>
    </div>
  );
};
