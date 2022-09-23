import bcrypt from "bcrypt";
import { getDbConnection } from "../db";

export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { passwordResetCode } = req.params;
    const { password } = req.body;

    const db = getDbConnection(process.env.DBNAME);

    const user = await db
      .collection(process.env.USERSCOLLECTION)
      .findOne({ passwordResetCode });

    if (user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await db
        .collection(process.env.USERSCOLLECTION)
        .updateOne({ passwordResetCode }, { $set: { hashedPassword } });

      res.send("Password updated");
    } else {
      res.status(400).send("Invalid password reset code");
    }
  },
};
