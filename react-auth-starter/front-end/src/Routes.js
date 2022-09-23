import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoutes";

import UserInfoPage from "./pages/UserInfoPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import LogoutPage from "./pages/LogoutPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PasswordResetLandingPage from "./pages/PasswordResetLandingPage";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        {routing.map((route, index) => {
          return route.privateRoute ? (
            <PrivateRoute key={index} {...route}>
              {route.component}
            </PrivateRoute>
          ) : (
            <Route key={index} {...route}>
              {route.component}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
};

export const getRoute = (routeName) => {
  const route = routing.find((route) => route.name === routeName);
  return route.path;
};

export const routing = [
  {
    name: "home",
    path: "/",
    component: <UserInfoPage />,
    exact: true,
    privateRoute: true,
  },
  { name: "login", path: "/login", component: <LoginPage /> },
  { name: "signup", path: "/signup", component: <SignUpPage /> },
  {
    name: "verifyemail",
    path: "/verify-email",
    component: <VerifyEmailPage />,
  },
  {
    name: "emailverification",
    path: "/email-verification/:verificationString",
    component: <EmailVerificationPage />,
  },
  {
    name: "logout",
    path: "/logout",
    component: <LogoutPage />,
  },
  {
    name: "forgotpassword",
    path: "/forgot-password",
    component: <ForgotPasswordPage />,
  },
  {
    name: "resetpassword",
    path: "/reset-password/:passwordResetCode",
    component: <PasswordResetLandingPage />,
  },
];
