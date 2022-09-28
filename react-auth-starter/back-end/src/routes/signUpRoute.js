import { getDbConnection } from "../db";
import { v4 as uuid } from "uuid";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";

import sendEmail from "../services/sendEmail";
import { log } from "../services/logging";
import hashPassword from "../services/hashPassword";
import createToken from "../services/createToken";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const attributes = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];

    awsUserPool.signUp(email, password, attributes, null, async (err, res) => {
      if (err) {
        res.status(400).json({ error: err.message });
        log(err);
        return;
      }
      const db = getDbConnection("react-auth-db");

      const startingInfo = {
        hairColor: "",
        favoriteFood: "",
        bio: "",
      };

      const result = await db.collection("users").insertOne({
        email,
        info: startingInfo,
      });

      const { instertedId } = result;

      const token = createToken(instertedId, false, email, startingInfo);

      const cognitoUser = result.user;
      res.status(200).json({ message: "User created successfully" });
    });
  },
};
