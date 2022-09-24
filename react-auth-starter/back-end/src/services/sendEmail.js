import sendgrid from "@sendgrid/mail";
import { log } from "./logging";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ to, from, subject, text, html }) => {
  const msg = { to, from, subject, text, html };

  try {
    sendgrid.send(msg).then(() => {
      log(`Email sent to ${to} with following subject ${subject}`);
    });
  } catch (error) {
    log(error);
    res.status(500).send("error");
  }
};

export default sendEmail;
