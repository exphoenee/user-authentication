import bcrypt from "bcrypt";
import { log } from "./logging";

const hashPassword = async (text) => {
  try {
    const salt = await bcrypt.genSalt(+process.env.SALT);
    return await bcrypt.hash(text, salt);
  } catch (error) {
    log(error);
  }
};

export default hashPassword;
