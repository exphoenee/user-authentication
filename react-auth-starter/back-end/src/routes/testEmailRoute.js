import { sendEmail } from "../utils/sendEmail";
import { log } from "../utils/logging";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      const { to, from, subject, text, html } = req.body;

      sendEmail({
        to: "bozzay.viktor@gmail.com",
        from: "viktor.bozzay@webforsol.hu",
        subject,
        text,
      });
      log("Email sent");
      res.status(200).json({ message: "Email sent" });
    } catch (err) {
      log(err);
      res.status(500).send(err);
    }
  },
};
