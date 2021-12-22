import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";

import CreateTraining from "../../components/CreateTraining/CreateTraining";
import TrainingRow from '../../components/TrainingRow/TrainingRow'
import "./Dashboard.css";

type Training = {
  id: number;
  username: string;
  hours: number;
  date: string;
  userId: number;
};

type getTrainingsResponseBody = {
  status: "success" | "error";
  trainingList?: Training[];
  message?: string;
};

export default function Dashboard() {
  const { token, setToken } = useAppContext();
  const [showCreateTraining, setShowCreateTraining] = useState(false);
  const [trainingList, setTrainingList] = useState<Training[]>([]);
  const [fetchError, setFetchError] = useState("");

  const fetchTrainings = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}training/all`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    );
    const responseBody: getTrainingsResponseBody = await response.json();
    if (responseBody.status === "error")
      return setFetchError("Erreur lors de la récupération des données serveur");
    setTrainingList(responseBody.trainingList);
  };

  useEffect(() => {  
    fetchTrainings();
  }, [token]);

  return (
    <div className="Dashboard">
      <div className="table">
        <div className="control">
          <label htmlFor="hours">
            Nombre d&apos;heures
            <input type="number" id="hours"></input>
          </label>
          <button onClick={() => setShowCreateTraining(!showCreateTraining)}>
            Ajouter un nombre d&apos;heure d&apos;entrainement
          </button>
        </div>
        {showCreateTraining && <CreateTraining fetchTrainings={fetchTrainings}/>}
        {fetchError ? (
          <h2 className="error">{fetchError}</h2>
        ) : (
          <table>
            <thead>
              <tr>
                <th>username</th>
                <th>heures d&apos;entrainement</th>
                <th>date</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {trainingList.map((training) => 
                <TrainingRow key={training.id} training={training} fetchTrainings={fetchTrainings}/>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="stats"></div>
    </div>
  );
}
