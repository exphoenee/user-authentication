import { getDbConnection } from "../db";

export const updateUserFromOAuth = async ({ oAuthUserInfo }) => {
  const {
    id: googleId,
    verified_email: isVerified,
    email,
    name,
    picture: avatar,
  } = oAuthUserInfo;

  const db = getDbConnection(process.env.DBNAME);

  const existingUser = await db
    .collection(process.env.USERSCOLLECTION)
    .findOne({
      email,
    });

  if (existingUser) {
    const result = await db.collection.findOneAndUpdate(
      { email },
      { $set: { googleId, isVerified, avatar, name } },
      { returnOriginal: false }
    );
    return result.value;
  } else {
    const result = await db.collection.insertOne({
      googleId,
      isVerified,
      email,
      avatar,
      name,
      info: {},
    });
    return result.ops[0];
  }
};
