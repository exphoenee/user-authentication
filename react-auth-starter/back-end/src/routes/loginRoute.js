import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
import { log } from "../utils/logging";

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
              log("Error signing token");
            }
            res.status(200).send({ token });
            log("JWT token created.");
          }
        );
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
