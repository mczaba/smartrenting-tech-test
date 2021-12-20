import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbQuery from "../util/db";

const logIn = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const userResult = await dbQuery(
      `SELECT username, password FROM user WHERE LOWER(username) = "${username.toLowerCase()}"`
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
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ status: "success", token });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send({ status: "error", message: "Erreur du serveur" });
  }
};

const populateUsers = async (req, res) => {
  const users = [
    { username: "bob", password: "ross" },
    { username: "jean", password: "pierre" },
    { username: "jacques", password: "brel" },
  ];
  users.forEach(async (user) => {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      const insertResult = await dbQuery(
        `INSERT INTO user (username, password) VALUES("${user.username}","${hash}")`
      );
      console.log(insertResult);
      if (!insertResult) throw new Error(`could not insert ${user.username}`);
    } catch (err) {
      console.log(err.message);
    }
  });
  res.send("done");
};

export default { logIn, populateUsers };
