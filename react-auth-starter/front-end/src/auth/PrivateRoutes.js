import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props) => {
  const user = true;

  if (!user) {
    console.log("redirected");
    return <Redirect to="/login" />;
  } else {
    console.log("not redirected");
    return <Route {...props} />;
  }
};
