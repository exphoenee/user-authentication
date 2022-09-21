import jwt, { verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";
import { log } from "../utils/logging";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    //getting the authorization from header
    const { authorization } = req.headers;

    //getting the user id from the url
    const { userId } = req.params;

    //getting the new user info from the body
    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    //if the authorization header is not present, send a 401 status code
    if (!authorization) {
      log("No authorization header sent!");
      return res.status(401).json({ message: "No authorization header sent" });
    }

    //if the authorization header is present, verify the token
    const token = authorization.split(" ")[1];

    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      //if there is an error, send a 401 status code and a message
      if (err) {
        log("Unable to verify token!");
        return res.status(401).json({ message: "Unable to verify token!" });
      }

      //decode the id and isVerified fields from the token
      const { id, isVerified } = decoded;

      //if the id from the token does not match the id from the url, send a 403 status code and a message
      if (id !== userId) {
        log("Not allowed to update that user's data!");
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });
      }
      //if the user is not verified, send a 403 status code and a message
      if (!isVerified) {
        log("You need to verify your email before change to info.");
        return res.status(403).json({
          message: "You need to verify your email before change to info.",
        });
      }

      //getting the database connection
      const db = getDbConnection(process.env.DBNAME);

      //updating the user's info in the db
      const result = await db
        .collection(process.env.USERSCOLLECTION)
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: { info: updates } },
          { returnOriginal: false }
        );
      const { email, info } = result.value;

      //signing a new token with the updated user data
      jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            log("JWT token sign failed.");
            return res.status(200).json(err);
          }
          log("JWT token signed.");
          res.status(200).json({ token });
        }
      );
    });
  },
};
