import db from "../util/db";

const addTraining = async (req, res, next) => {
  const { userId, numberOfHours, date } = req.body;
  const selectResult = await db.query(
    `SELECT id FROM training WHERE date = ${db.escapeString(
      date
    )} AND userId = ${db.escapeString(userId)}`
  );
  if (selectResult.length > 0)
    return res
      .status(401)
      .json({
        status: "error",
        message: "Cet utilisateur a déjà un entrainement à cette date",
      });
  const insertResult = await db.query(
    `INSERT INTO training (userId, hours, date) VALUES(${db.escapeString(
      userId
    )}, ${db.escapeString(numberOfHours)}, ${db.escapeString(date)})`
  );
  if (!insertResult) return next("Impossible d'ajouter un entrainement");
  return res.status(200).json({ status: "success", message: "ok" });
};

const getAllTrainings = async (req, res, next) => {
  try {
    const trainingsResult =
      await db.query(`SELECT training.id, username, hours, date, userId FROM training 
    INNER JOIN user ON user.id = training.userId
    ORDER BY date`);
    res.json({ status: "success", trainingList: trainingsResult });
  } catch (err) {
    next(err.message);
  }
};

const deleteTraining = async (req, res, next) => {
  try {
    const { trainingId } = req.params;
    await db.query(
      `DELETE FROM training WHERE id = ${db.escapeString(trainingId)}`
    );
    res.status(200).json({ status: "success", message: "ok" });
  } catch (err) {
    next(err.message);
  }
};

const changeTrainingHours = async (req, res, next) => {
  try {
    const { trainingId } = req.params;
    const { numberOfHours } = req.body;
    await db.query(
      `UPDATE training SET hours = ${db.escapeString(
        numberOfHours
      )} WHERE id = ${db.escapeString(trainingId)}`
    );
    res.json({ status: "success", message: "ok" });
  } catch (err) {
    next(err.message);
  }
};

export default {
  addTraining,
  getAllTrainings,
  deleteTraining,
  changeTrainingHours,
};
