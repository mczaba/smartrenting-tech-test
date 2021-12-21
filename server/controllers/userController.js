import bcrypt from "bcryptjs";
import dbQuery from "../util/db";

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
      console.error(err.message);
    }
  });
  res.send("done");
};

const getAllUsers = async (req, res) => {
    try {
        const usersResult = await dbQuery(`SELECT id, username FROM user`)
        res.json({status: 'success', userList: usersResult})
    } catch(err) {
        res.json({status: 'error', message: err.message})
    }
}

export default { populateUsers, getAllUsers };
