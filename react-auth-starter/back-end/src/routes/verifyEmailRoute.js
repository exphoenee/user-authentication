import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";
import { log } from "../services/logging";

import { CogintoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../services/awsUserPool";

export const verifyEmailRoute = {
  path: "/api/verifyemail",
  method: "put",
  handler: async (req, res) => {
    //first getting the everification string form the url
    const { email, verificationString } = req.body;

    new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    }).confirmRegistration(verificationString, true, async (err, result) => {
      if (err) {
        log(err);
        res.status(401).send({ message: "Verification failed" });
      } else {
        log("Verification successful");
        res.status(200).send("Verification successful");
        const db = getDbConnection(process.env.DBNAME);
        const user = await db
          .collection(process.env.USERSCOLLECTION)
          .findOneAndUpdate(
            { verificationString },
            { $set: { isVerified: true } },
            { returnOriginal: false }
          );
        const { _id: id, info } = user.value;
        createToken(id, email, true, info);
      }
    });
  },
};
