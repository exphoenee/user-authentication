import sendgrid from "@sendgrid/mail";
import { log } from "../utils/logging";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = ({ to, from, subject, text, html }) => {
  const msg = { to, from, subject, text, html };

  sendgrid
    .send(msg)
    .then(() => {
      log("Email sent");
    })
    .catch((error) => {
      log(error);
    });
};
