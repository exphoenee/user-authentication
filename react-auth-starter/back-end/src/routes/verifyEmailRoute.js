import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";
import { jwt } from "jsonwebtoken";
import { log } from "../utils/logging";

export const verifyEmailRoute = {
  path: "/api/verifyemail",
  method: "post",
  handler: async (req, res) => {
    //first getting the everification string form the url
    const { verificationString } = req.body;

    console.log(req);

    //getting the database connection
    const db = getDbConnection(process.env.DBNAME);

    //finding the user with the verification string
    const user = await db
      .collection(process.env.USERSCOLLECTION)
      .findOne({ verificationString });

    //if the user is not found, send a 404 status code
    if (!user) {
      log("User not found in DB!");
      return res.status(404).send("User not found");
    }

    //if the user is found, update the user's isVerified field to true
    const result = await db
      .collection(process.env.USERSCOLLECTION)
      .updateOne({ _id: ObjectId(id) }, { $set: { isVerified: true } });

    console.log(result);
    const { _id: id, email, info } = result;

    //signing a new token with the updated user data
    jwt.sign(
      { id, email, isVerified: true, info },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          log("JWT token signing failed!");
          return res.status(500).json(err);
        }
        log("JWT token signed!");
        res.status(200).json({ token });
      }
    );
  },
};
