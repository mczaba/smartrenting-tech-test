import db from "../util/db";

const addTraining = async (req, res) => {
  const { userId, numberOfHours, date } = req.body;
  const insertResult = await db.query(
    `INSERT INTO training (userId, hours, date) VALUES(${db.escapeString(
      userId
    )}, ${db.escapeString(numberOfHours)}, ${db.escapeString(date)})`
  );
  if (!insertResult)
    return res
      .status(500)
      .json({ status: "error", message: "could not add new hour" });
  return res.status(200).json({ status: "success", message: "ok" });
};

const getAllTrainings = async (req, res) => {
  try {
    const trainingsResult =
      await db.query(`SELECT training.id, username, hours, date, userId FROM training 
    INNER JOIN user ON user.id = training.userId`);
    res.json({ status: "success", trainingList: trainingsResult });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

const deleteTraining = async (req, res) => {
  try {
    const { trainingId } = req.params;
    await db.query(
      `DELETE FROM training WHERE id = ${db.escapeString(trainingId)}`
    );
    res.json({ status: "success", message: "ok" });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

const changeTrainingHours = async (req, res) => {
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
    res.json({ status: "error", message: err.message });
  }
};

export default {
  addTraining,
  getAllTrainings,
  deleteTraining,
  changeTrainingHours,
};
