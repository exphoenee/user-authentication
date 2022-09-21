import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserInfoPage } from "./pages/UserInfoPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { PrivateRoute } from "./auth/PrivateRoutes";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import { EmailVerificationPage } from "./pages/EmailVerificationPage";
import { LogoutPage } from "./pages/LogoutPage";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <UserInfoPage />
        </PrivateRoute>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/verifyemail">
          <VerifyEmailPage />
        </Route>
        <Route path="/email-verification/:verificationString">
          <EmailVerificationPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/logout">
          <LogoutPage />
        </Route>
      </Switch>
    </Router>
  );
};
