import { getDbConnection } from "../db";
import { v4 as uuid } from "uuid";
import { sendEmail } from "../services/sendEmail";
import { log } from "../services/logging";

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
    const hashedPassword = await hashPassword(password);

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

    // send the verification email with the verification string as a link
    log("Sending verification email...");
    sendEmail({
      to: email,
      from: process.env.SENDERMAIL,
      subject: "Please verify your email",
      text: `Please click on the following link to verify your email: http://localhost:3000/email-verification/${verificationString}`,
    });
    log("Verification email sent!");

    // sign a new token with the user's id and email
    createToken(insertedId, email, false, startingInfo);
  },
};
