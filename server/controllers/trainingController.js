import dbQuery from "../util/db";

const addTraining = async (req, res) => {
  const { userId, numberOfHours, date } = req.body;
  const insertResult = await dbQuery(
    `INSERT INTO training (userId, hours, date) VALUES(${userId}, ${numberOfHours}, "${date}")`
  );
  if (!insertResult)
    return res
      .status(500)
      .json({ status: "error", message: "could not add new hour" });
  return res.status(200).json({ status: "success", message: "ok" });
};

export default { addTraining };
