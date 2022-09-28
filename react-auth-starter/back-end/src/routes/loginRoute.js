import bcrypt from "bcrypt";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";

import awsUserPool from "../utils/awsUserPool";
import { getDbConnection } from "../db";
import { log } from "../services/logging";
import createToken from "../services/token";
import { awsUserPool } from "./../util/awsUserPool";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    }).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async (result) => {
          const db = getDbConnection(process.env.DBNAME);
          const user = await db
            .collection(process.env.USERSCOLLECTION)
            .findOne({ email });

          if (user) {
            log("User found in DB");
            const { _id: id, isVerified, hashedPassword, info } = user;
            //use bcript to compare the passwords
            const isPasswordCorrect = await bcrypt.compare(
              password,
              hashedPassword
            );

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
        onFailure: (err) => {
          log(err.message);
          res.status(401).send(err.message);
        },
      }
    );
  },
};
