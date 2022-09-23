import { v4 as uuid } from "uuid";

import { sendEmail } from "../utils/sendEmail";
import { getDbConnection } from "../db";
import { log } from "../utils/logging";

export const forgotPasswordRoute = {
  path: "/api/forgot-password/:email",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.params;

    const passwordResetCode = uuid();

    const db = getDbConnection(process.env.DBNAME);

    console.log(email);

    const user = await db
      .collection(process.env.USERSCOLLECTION)
      .updateOne({ email }, { $set: { passwordResetCode } });

    console.log(user);

    if (user.modifiedCount > 0) {
      try {
        sendEmail({
          to: email,
          from: process.env.SENDERMAIL,
          subject: "Password Reset",
          text: `To reset your password click this link: http://localhost:3000/reset-password/${passwordResetCode}`,
        });
      } catch (error) {
        log(error);
        res.status(500).send("error");
      }
    }
  },
};