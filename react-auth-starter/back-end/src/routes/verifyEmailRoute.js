import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";
import { jwt } from "jsonwebtoken";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    //first getting the everification string form the url
    const { verificationString } = req.params;

    //getting the database connection
    const db = getDbConnection("react-auth-db");

    //finding the user with the verification string
    const user = await db.collection("users").findOne({ verificationString });

    //if the user is not found, send a 404 status code
    if (!user) {
      return res.status(404).send("User not found");
    }

    const { _id: id, email, info } = result;

    //if the user is found, update the user's isVerified field to true
    const result = await db
      .collection("users")
      .updateOne({ _id: ObjectId(id) }, { $set: { isVerified: true } });

    //signing a new token with the updated user data
    jwt.sign(
      { id, email, isVerified: true, info },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
