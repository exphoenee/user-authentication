import { log } from "../utils/logging";

export const logoutRoute = {
  path: "/api/logout",
  method: "post",
  handler: () => {
    log("User logged out!");
  },
};
