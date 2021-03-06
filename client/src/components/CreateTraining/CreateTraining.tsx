import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import dayjs from "dayjs";

import "./CreateTraining.css";

type User = {
  id: number;
  username: string;
};

type GetUserResponseBody = {
  status: "success" | "error";
  userList?: User[];
  message?: string;
};

type PostTrainingResponseBody = {
  status: "success" | "error";
  message: string;
};

type nullableString = string | null;

const today = dayjs().format("YYYY-MM-DD");

type Props = {
  fetchTrainings: () => void;
};

export default function CreateTraining({ fetchTrainings }: Props) {
  const { token, setToken } = useAppContext();
  const [userList, setUserList] = useState<User[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [userId, setUserId] = useState<nullableString>(null);
  const [numberOfHours, setNumberOfHours] = useState("1");
  const [date, setDate] = useState(today);
  const [validationError, setValidationError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}user/all`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      const responseBody: GetUserResponseBody = await response.json();
      if (responseBody.status === "error")
        return setFetchError(responseBody.message);
      setUserList(responseBody.userList);
    };
    fetchUsers();
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError("");
    setSuccess("");
    if (!userId) return setValidationError("Vous devez choisir un utilisateur");
    const body = { userId, numberOfHours, date };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}training/add`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`
        },
        body: JSON.stringify(body)
      }
    );
    const responseBody: PostTrainingResponseBody = await response.json();
    if (responseBody.status === "error")
      return setValidationError(responseBody.message);
    setSuccess("Les heures d'entrainement ont bien ??t?? rajout??es");
    fetchTrainings();
  };

  return (
    <div className="createTraining">
      {fetchError ? (
        <h4 className="error">{fetchError}</h4>
      ) : (
        <div>
          <h2>Ajouter des heures d&apos;entrainement</h2>
          <form className="addTrainingForm" onSubmit={handleSubmit}>
            <div className="input-div">
            <label htmlFor="user">Utilisateur</label>
              <select
                name="user"
                id=""
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              >
                <option value="null"></option>
                {userList.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-div">
              <label htmlFor="hours">Nombre d&apos;heures</label>
              <select
                name="hours"
                value={numberOfHours}
                onChange={(event) => setNumberOfHours(event.target.value)}
              >
                {Array.from(Array(10).keys()).map((number) => (
                  <option key={`hour${number + 1}`} value={number + 1}>
                    {number + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-div">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              ></input>
            </div>
            <button>Ajouter les heures</button>
          </form>
          {validationError && <p className="error">{validationError}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      )}
    </div>
  );
}
