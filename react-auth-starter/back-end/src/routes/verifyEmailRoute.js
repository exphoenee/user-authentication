import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";
import { log } from "../utils/logging";

export const verifyEmailRoute = {
  path: "/api/verifyemail",
  method: "put",
  handler: async (req, res) => {
    //first getting the everification string form the url
    const { verificationString } = req.body;

    //getting the database connection
    const db = getDbConnection(process.env.DBNAME);

    //finding the user with the verification string
    const user = await db
      .collection(process.env.USERSCOLLECTION)
      .findOne({ verificationString });

    //if the user is not found, send a 404 status code
    if (!user) {
      log("The email email verification code is incorrect!!");
      return res
        .status(401)
        .send({ message: "The email email verification code is incorrect!" });
    }

    const { _id: id, email, info } = user;

    //if the user is found, update the user's isVerified field to true
    await db
      .collection(process.env.USERSCOLLECTION)
      .updateOne({ _id: ObjectId(id) }, { $set: { isVerified: true } });

    //signing a new token with the updated user data
    jwt.sign(
      { id, email, isVerified: true, info },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          log("Error signing token");
          return res.sendStatus(500);
        }

        log("JTW token signed!");
        res.status(200).send({ token });
      }
    );
  },
};
