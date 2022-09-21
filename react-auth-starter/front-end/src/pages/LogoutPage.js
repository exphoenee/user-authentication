import { useHistory } from "react-router-dom";
import axios from "axios";

export const LogoutPage = () => {
  const history = useHistory();

  localStorage.removeItem("token");

  const login = () => {
    history.push("/login");
  };

  //send a post request to server api/logout to remove the token from the server
  axios.post("http://localhost:8080/api/logout").then((res) => {
    console.log(res);
  });

  return (
    <div className="content-container">
      <h1>You loged out form the page!</h1>

      <button onClick={login}>Login again?</button>
    </div>
  );
};
