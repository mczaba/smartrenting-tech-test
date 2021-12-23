import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";

type ResponseBody = {
  status: "error" | "success";
  message?: string;
  trainerList?: Trainer[];
};

type Trainer = {
  username: string;
  hours: number;
};


type Props = { updateStats: boolean };

export default function StatsTopTrainers({ updateStats }: Props) {
  const { token, setToken, userId, setUserId } = useAppContext();
  const [trainerList, setTrainerList] = useState<Trainer[]>([]);

  const fetchTrainers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}stats/toptrainers`,
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    );
    const responseBody: ResponseBody = await response.json();
    if (responseBody.status === "error")
      return console.log(responseBody.message);
    setTrainerList(responseBody.trainerList);
  };

  useEffect(() => {
    fetchTrainers();
  }, [updateStats]);

  return (
    <div>
      <h4>Top 5 utilisateurs</h4>
      <ul>
        {trainerList.map((trainer) => (
          <li key={`top${trainer.username}`}>
            {trainer.username} : {trainer.hours} heures
          </li>
        ))}
      </ul>
    </div>
  );
}
