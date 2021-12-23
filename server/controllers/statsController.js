import db from "../util/db";

const getAverage = async (req, res, next) => {
  try {
    const averageResult = await db.query(
      "SELECT IFNULL(AVG(hours), 0) averageHours FROM training"
    );
    res
      .status(200)
      .json({ status: "success", average: averageResult[0].averageHours });
  } catch (err) {
    next(err.message);
  }
};

const getSum = async (req, res, next) => {
  try {
    const { date } = req.params;
    const sumResult = await db.query(
      `SELECT IFNULL(SUM(hours), 0) hours FROM training WHERE date = ${db.escapeString(
        date
      )}`
    );
    res.status(200).json({ status: "success", sum: sumResult[0].hours });
  } catch (err) {
    next(err.message);
  }
};

const getTopTrainers = async (req, res, next) => {
  try {
    const topTrainersResult = await db.query(
      "SELECT IFNULL(SUM(hours), 0) hours, username FROM training INNER JOIN user ON training.userId = user.id GROUP BY userId ORDER BY hours DESC LIMIT 5"
    );
    res
      .status(200)
      .json({ status: "success", trainerList: topTrainersResult });
  } catch (err) {
    next(err.message);
  }
};

export default { getAverage, getSum, getTopTrainers };
