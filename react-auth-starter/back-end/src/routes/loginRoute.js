import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
import { log } from "../services/logging";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection(process.env.DBNAME);
    const user = await db
      .collection(process.env.USERSCOLLECTION)
      .findOne({ email });

    if (user) {
      log("User found in DB");
      const { _id: id, isVerified, hashedPassword, info } = user;
      //use bcript to compare the passwords
      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

      const handleUser = () => {
        //sign a new token with the user's id and email
        createToken(id, email, isVerified, info);
      };

      //if the password is correct, sign a new token with the user's id and email
      if (isPasswordCorrect) {
        handleUser();
        log("Password is correct!");
      } else {
        res.status(401).send("Incorrect password");
        log("Password is invalid!");
      }
    } else {
      res.status(401).send("User not found");
      log("User not found in DB!");
    }
  },
};
