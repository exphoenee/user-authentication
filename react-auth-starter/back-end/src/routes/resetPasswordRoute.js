import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "./../util/awsUserPool";

export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { passwordResetCode } = req.params;
    const { email, newPassword } = req.body;

    new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    }).confirmPassword(passwordResetCode, newPassword, {
      onSuccess: (result) => {
        res.status(200).send(result);
      },
      onFailure: (err) => {
        log(err.message);
        res.status(401).send(err.message);
      },
    });
  },
};
