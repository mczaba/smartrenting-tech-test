import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbQuery from "../util/db";

const createUser = async (username, password) => {
  try {
    const hash = await bcrypt.hash(password, 10)
    const insertUserResult = await dbQuery(`INSERT INTO user (username, password) VALUES("${username.toLowerCase()}","${hash}")`)
    if (!insertUserResult) throw new Error("L'utilisateur n'a pas pu être créé")
    return insertUserResult.insertId
  } catch(err) {
    throw new Error(err.message)
  }
}

const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await dbQuery(
      `SELECT * FROM user WHERE LOWER(username) = "${username.toLowerCase()}"`
    );
    if (!userResult || userResult.length === 0) {
      const insertId = await createUser(username, password)
      const token = jwt.sign(
        { id: insertId, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ status: "success", token });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      userResult[0].password
    );
    if (!passwordMatch)
      return res
        .status(403)
        .send({ status: "error", message: "Mauvais password" });
    const token = jwt.sign(
      { id: userResult[0].id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ status: "success", token });
  } catch (err) {
    return res
      .status(500)
      .send({ status: "error", message: "Erreur du serveur" });
  }
};



export default { logIn };
