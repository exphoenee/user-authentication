import { sendEmail } from "../utils/sendEmail";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      const { to, from, subject, text, html } = req.body;

      sendEmail({
        to: "bozzay.viktor@gmail.com",
        from: "viktor.bozzay@webforsol.hu",
        subject: "LinkedIn Learning Email Test",
        text: "Sikerült!",
      });

      res.status(200).json({ message: "Email sent" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
