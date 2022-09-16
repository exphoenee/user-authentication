import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { getDbConnection } from "../db";

export const updateUserInfoRoute = {
  path: "/api/users/:id",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = ({ favoriteFood, hairColor, bio }) =>
      ({ favoriteFood, hairColor, bio }(req.body));

    if (!authorization) {
      return res.status(401).json({ message: "No authorization header found" });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unable to verify token!" });
      }

      const { id } = decoded;

      if (id !== userId)
        res
          .status(403)
          .json({ message: "Not allowed to update that user's data!" });

      const db = getDbConnection("react-auth-db");
      const result = await db
        .collection("users")
        .findOneAndUpadate(
          { _id: ObjectId(id) },
          { $set: { info: updates } },
          { returnOriginal: false }
        );

      const { email, isVerufied, info } = result.value;
      jwt.sign(
        { id, email, isVerufied, info },
        JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.status(200).json(err);
          }
          res.json({ token });
        }
      );
    });
  },
};
