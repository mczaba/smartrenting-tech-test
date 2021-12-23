import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import dayjs from "dayjs";

import './StatsDateSum.css'

type ResponseBody = {
  status: "error" | "success";
  message?: string;
  sum?: number;
};

type nullableNumber = null | number;

type Props = { updateStats: boolean };

export default function StatsDateSum({ updateStats }: Props) {
  const { token, setToken, userId, setUserId } = useAppContext();
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [sum, setSum] = useState<nullableNumber>(null);

  const fetchSum = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}stats/sum/${date}`,
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    );
    const responseBody: ResponseBody = await response.json();
    if (responseBody.status === "error")
      return console.log(responseBody.message);
    setSum(responseBody.sum);
  };

  useEffect(() => {
    fetchSum();
  }, [date, updateStats]);

  return (
    <div>
      <h4>Somme des heures d&apos;entrainement par date</h4>
      <div className="flex-container">
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <p>Somme des heures : {sum}</p>
      </div>
    </div>
  );
}
