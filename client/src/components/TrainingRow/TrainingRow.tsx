import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import dayjs from "dayjs";

type Training = {
  id: number;
  username: string;
  hours: number;
  date: string;
  userId: number;
};

type Props = {
  training: Training;
  fetchTrainings: () => void;
};

type ResponseBody = {
  status: "error" | "success";
  message: string;
};

export default function TrainingRow({ training, fetchTrainings }: Props) {
  const { token, setToken, userId, setUserId } = useAppContext();
  console.log({ trainingUserId: training.userId, userId });

  const deleteTraining = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}training/${training.userId}/${training.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    );
    const responseBody: ResponseBody = await response.json();
    if (responseBody.status === "error") return alert(responseBody.message);
    fetchTrainings();
  };

  const setNumberOfHours = async (numberOfHours: number) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}training/${training.userId}/${training.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`
        },
        body: JSON.stringify({ numberOfHours })
      }
    );
    const responseBody: ResponseBody = await response.json();
    if (responseBody.status === "error") return alert(responseBody.message);
    fetchTrainings();
  };

  return (
    <tr>
      <td>{training.username}</td>
      <td>{training.hours}</td>
      <td>{dayjs(training.date).format("DD/MM/YYYY")}</td>
      <td>
        {training.userId === userId && (
          <div>
            <select
              value={training.hours}
              onChange={(event) => setNumberOfHours(Number(event.target.value))}
            >
              {Array.from(Array(10).keys()).map((number) => (
                <option key={`hour${number + 1}`} value={number + 1}>
                  {number + 1}
                </option>
              ))}
            </select>
            <button onClick={deleteTraining}>supprimer</button>
          </div>
        )}
      </td>
    </tr>
  );
}
