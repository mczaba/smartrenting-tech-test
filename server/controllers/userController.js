import bcrypt from "bcryptjs";
import db from "../util/db";

const populateUsers = async (req, res) => {
  const users = [
    { username: "bob", password: "ross" },
    { username: "jean", password: "pierre" },
    { username: "jacques", password: "brel" },
  ];
  users.forEach(async (user) => {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      const insertResult = await db.query(
        `INSERT INTO user (username, password) VALUES(${db.escapeString(user.username)},"${hash}")`
      );
      if (!insertResult) throw new Error(`could not insert ${user.username}`);
    } catch (err) {
      console.error(err.message);
    }
  });
  res.send("done");
};

const getAllUsers = async (req, res, next) => {
    try {
        const usersResult = await db.query(`SELECT id, username FROM user`)
        res.json({status: 'success', userList: usersResult})
    } catch(err) {
        next(err.message)
    }
}

export default { populateUsers, getAllUsers };
