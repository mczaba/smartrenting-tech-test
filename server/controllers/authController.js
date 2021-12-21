import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbQuery from "../util/db";

const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await dbQuery(
      `SELECT * FROM user WHERE LOWER(username) = "${username.toLowerCase()}"`
    );
    if (!userResult || userResult.length === 0)
      return res.status(403).json({
        status: "error",
        message: "Aucun utilisateur avec ce nom n'a été trouvé",
      });
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
    console.error(err.message);
    return res
      .status(500)
      .send({ status: "error", message: "Erreur du serveur" });
  }
};



export default { logIn };
