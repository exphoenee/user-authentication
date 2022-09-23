import bcrypt from "bcrypt";
import { getDbConnection } from "../db";

export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { passwordResetCode } = req.params;
    const { newPassword } = req.body;

    const db = getDbConnection(process.env.DBNAME);

    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await db
      .collection(process.env.USERSCOLLECTION)
      .findOneAndUpdate(
        { passwordResetCode },
        { $set: { newHashedPassword } },
        { $unset: { passwordResetCode: "" } }
      );

    if (user.lastErrorObject.n === 0) {
      res.status(404).send("Password reset failed");
    }
    res.status(200).send("Password reset successful");
  },
};
