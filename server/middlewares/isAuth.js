import jwt from "jsonwebtoken";
import db from "../util/db";

const isAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Vous n'avez pas l'autorisation nécessaire");
    } else {
      const token = req.headers.authorization.split(" ")[1];
      let decodedToken = null;
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken)
        throw new Error("Vous n'avez pas l'autorisation nécessaire");
      req.userId = decodedToken.id;
      next();
    }
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "Vous n'avez pas l'aurorisation nécessaire",
    });
  }
};

const checkUser = async (req, res, next) => {
  const { trainingId } = req.params;
  const selectResult = await db.query(
    `SELECT userId FROM training WHERE id = ${db.escapeString(trainingId)}`
  );
  if (!selectResult)
    return res
      .status(404)
      .json({ status: "error", message: "cette mission n'existe pas" });
  if (selectResult[0].userId !== req.userId)
    return res
      .status(401)
      .json({
        status: "error",
        message: "Vous n'avez pas l'aurotisation nécessaire",
      });
  return next();
};

export default { isAuth, checkUser };
