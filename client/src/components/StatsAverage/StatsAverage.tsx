import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import dayjs from "dayjs";

type ResponseBody = {
  status: "error" | "success";
  message?: string;
  average?: number;
};

type nullableNumber = null | number;

type Props = { updateStats: boolean };

export default function StatsDateAverage({ updateStats }: Props) {
  const { token, setToken, userId, setUserId } = useAppContext();
  const [average, setAverage] = useState<nullableNumber>(null);

  const fetchAverage = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}stats/average/`,
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    );
    const responseBody: ResponseBody = await response.json();
    if (responseBody.status === "error")
      return console.log(responseBody.message);
    setAverage(responseBody.average);
  };

  useEffect(() => {
    fetchAverage();
  }, [updateStats]);

  return (
    <div>
      <h4>Moyenne des heures d&apos;entrainement</h4>
        {average && <p>Moyenne : {average}</p>}
    </div>
  );
}
