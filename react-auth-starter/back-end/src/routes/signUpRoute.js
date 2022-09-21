import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
import { v4 as uuid } from "uuid";
import { sendEmail } from "../utils/sendEmail";
import { log } from "../utils/logging";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection(process.env.DBNAME);
    const user = await db
      .collection(process.env.USERSCOLLECTION)
      .findOne({ email });

    if (user) {
      log("User already exists in DB!");
      res.status(409).send("User already exists in DB!");
    }

    // use bycrypt to hash the password
    // saltrounds is the number of times the password is hashed
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a verification string
    const verificationString = uuid();

    // create a new user object
    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    // insert the user into the database
    const result = await db.collection(process.env.USERSCOLLECTION).insertOne({
      email,
      hashedPassword,
      info: startingInfo,
      verificationString,
      isVerified: false,
    });

    // get the id of the newly created user
    const { insertedId } = result;

    try {
      // send the verification email with the verification string as a link
      log("Sending verification email...");
      await sendEmail({
        to: email,
        from: "viktor.bozzay@webforsol.hu",
        subject: "Please verify your email",
        text: `Please click on the following link to verify your email: http://localhost:3000/verify-email/${verificationString}`,
      });
    } catch (err) {
      log(err);
    }

    // sign a new token with the user's id and email
    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
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
