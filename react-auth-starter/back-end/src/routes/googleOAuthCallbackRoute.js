import jwt from "jsonwebtoken";
import { getGoogleUser } from "./../util/getGoogleUser";
import { updateUserFromOAuth } from "./../util/updateUserFormOAuth";

export const googleOAuthCallbackRoute = {
  path: "/auth/google/callback",
  method: "get",
  handler: async (req, res) => {
    const { code } = req.query;

    const googleUser = await getGoogleUser(code);
    const user = await updateUserFromOAuth({ oAuthUserInfo: googleUser });

    const { _id: id, isVerified, email, info } = user;

    createToken(id, isVerified, email, info, (token) => {
      res.redirect(`http://localhost:3000/login?token=${token}`);
    });
  },
};
