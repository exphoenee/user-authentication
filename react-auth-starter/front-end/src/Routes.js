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
import EmailVerificationCodePage from "./pages/EmailVerificationCodePage";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        {routing.map((route, index) => {
          const { path, exact } = route;
          return route.privateRoute ? (
            <PrivateRoute key={index} {...{ path, exact }}>
              {route.component}
            </PrivateRoute>
          ) : (
            <Route key={index} {...{ path, exact }}>
              {route.component}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
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
    path: "/reset-password",
    component: <PasswordResetLandingPage />,
  },
  {
    name: "emailverificationcode",
    path: "/verify-email",
    component: <EmailVerificationCodePage />,
    exact: true,
  },
];

export const getRoute = (routeName, params = null) => {
  const route = routing.find((route) => route.name === routeName);
  const urlParams =
    typeof params === "object" && params !== null
      ? "?" +
        Object.entries(params)
          .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
          .join("&")
      : "";
  return route.path + urlParams;
};
