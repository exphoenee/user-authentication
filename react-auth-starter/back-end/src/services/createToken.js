import jwt, { verify } from "jsonwebtoken";

export const createToken = (id, email, isVerified, info) => {
  jwt.sign(
    { id, email, isVerified, info },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
    (err, token) => {
      if (err) {
        log("JWT token sign failed.");
        return res.status(200).json(err);
      }
      log("JWT token signed.");
      res.status(200).json({ token });
    }
  );
};
