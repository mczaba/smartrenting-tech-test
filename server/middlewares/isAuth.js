const jwt = require("jsonwebtoken");

const isAuth = (singleUser) => (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Vous n'avez pas l'autorisation nécessaire");
    } else {
      const token = req.headers.authorization.split(" ")[1];
      let decodedToken = null;
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken)
        throw new Error("Vous n'avez pas l'autorisation nécessaire");
      if (singleUser && Number(req.params.userId) !== decodedToken.id)
        throw new Error("Vous n'avez pas l'autorisation nécessaire");
      next();
    }
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "Vous n'avez pas l'aurorisation nécessaire",
    });
  }
};
export default isAuth;
