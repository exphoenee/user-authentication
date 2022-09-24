import sendEmail from "../services/sendEmail";
import { log } from "../services/logging";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    const { to, from, subject, text, html } = req.body;

    sendEmail({
      to: "bozzay.viktor@gmail.com",
      from: process.env.SENDERMAIL,
      subject,
      text,
    });
    log("Email sent");
    res.status(200).json({ message: "Email sent" });
  },
};
