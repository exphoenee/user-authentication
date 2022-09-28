import { getGoogleOAuthUrl } from "../util/getGoogleOauthUrl";

export const getGoogleOAuthUrlRouth = {
  path: "/auth/google/url",
  method: "get",
  handler: async (req, res) => {
    const url = getGoogleOAuthUrl();
    res.status(200).send(url);
  },
};
