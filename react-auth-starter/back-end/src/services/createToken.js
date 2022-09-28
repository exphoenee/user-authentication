import jwt, { verify } from "jsonwebtoken";

const createToken = (id, email, isVerified, info, cb) => {
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
      cb(err, token);
    }
  );
};

export default createToken;
