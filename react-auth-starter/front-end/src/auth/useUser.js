import { useState, useEffect } from "react";

export const useUser = () => {
  const [token, setToken] = useState(null);

  const getPayloadFromToken = (token) => {
    if (!token) {
      return null;
    }
    const encodedPayload = token.split(".")[1];
    return JSON.parse(Buffer.from(encodedPayload, "base64").toString("ascii"));
  };
  const [user, setUser] = useState(() => getPayloadFromToken(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);
  return user;
};
