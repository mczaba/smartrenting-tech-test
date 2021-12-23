import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../util/db";

const createUser = async (username, password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const insertUserResult = await db.query(
      `INSERT INTO user (username, password) VALUES(${db.escapeString(
        username.toLowerCase()
      )},"${hash}")`
    );
    if (!insertUserResult)
      throw new Error("L'utilisateur n'a pas pu être créé");
    return insertUserResult.insertId;
  } catch (err) {
    throw new Error(err.message);
  }
};

const generateToken = (id, username, res) => {
  const token = jwt.sign(
    { id, username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const responseBody = { status: "success", token, userId: id }
  return res.status(200).json(responseBody);
}

const logIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userResult = await db.query(
      `SELECT * FROM user WHERE LOWER(username) = ${db.escapeString(
        username.toLowerCase()
      )}`
    );
    if (!userResult || userResult.length === 0) {
      const insertId = await createUser(username, password);
      return generateToken(insertId, username, res)
    }
    const passwordMatch = await bcrypt.compare(
      password,
      userResult[0].password
    );
    if (!passwordMatch)
      return res
        .status(403)
        .send({ status: "error", message: "Mauvais password" });
    return generateToken(userResult[0].id, username, res)
  } catch (err) {
    return next("Erreur du serveur")
  }
};

export default { logIn };
