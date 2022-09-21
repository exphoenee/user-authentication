import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
import { log } from "../utils/logging";

export const logoutRoute = {
  path: "/api/logout",
  method: "post",
  handler: async (req, res) => {
    log("logoutRoute: User logged out!");
  },
};
