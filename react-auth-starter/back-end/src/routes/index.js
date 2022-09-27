import { testRoute } from "./testRoute";
import { signUpRoute } from "./signUpRoute";
import { loginRoute } from "./loginRoute";
import { updateUserInfoRoute } from "./updateUserInfoRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { logoutRoute } from "./logoutRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { getGoogleOAuthUrlRouth } from "./getGoogleOAuthUrlRoute";
//import { testEmailRoute } from "./testEmailRoute";

export const routes = [
  testRoute,
  signUpRoute,
  loginRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  logoutRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  getGoogleOAuthUrlRouth,
  //testEmailRoute,
];

export const routeInfo = () =>
  routes.map((route) => {
    const routeMap = { path: route.path, method: route.method };
    console.log(JSON.stringify(routeMap));
    return routeMap;
  });
//routeInfo();
