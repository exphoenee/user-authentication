import axios from "axios";
import { oAuthClient } from "./oAuthClient";

const getAccessAndBearerTokenUrl = ({ accessToken }) => {
  return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;
};

export const getGoogleUser = async ({ code }) => {
  const { tokens } = await oAuthClient.getToken(code);
  const { data } = await axios.get(
    { accessToken: getAccessAndBearerTokenUrl(tokens) },
    { headers: { Authorization: `Bearer ${tokens.id_token}` } }
  );
  return data;
};
