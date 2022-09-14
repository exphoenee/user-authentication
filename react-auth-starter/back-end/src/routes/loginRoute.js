import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      const { _id: id, isVerified, hashedPassword, info } = user;
      //use bcript to compare the passwords
      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

      const handleUser = () => {
        jwt.sign(
          {
            id,
            email,
            isVerified,
            info,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            if (err) {
              res.status(500).json(err);
            }
            res.status(200).send({ token });
          }
        );
      };

      if (isPasswordCorrect) {
        handleUser();
      } else {
        res.status(401).send("Incorrect password");
      }
    } else {
      res.status(401).send("User not found");
    }
  },
};
