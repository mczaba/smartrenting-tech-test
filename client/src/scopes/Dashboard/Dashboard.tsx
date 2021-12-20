import React from "react";
import {  useAppContext } from "../../contexts/AppContext";

import "./Dashboard.css";

export default function Dashboard() {
  const { token, setToken } = useAppContext();

  const logToken = () => {
    console.log(token)
  }
  
  return (
    <div className="Dashboard">
      <div className="table">
        <div className="control">
          <label htmlFor="hours">
            Nombre d&apos;heures
            <input type="number" id="hours"></input>
          </label>
          <button onClick={logToken}>Ajouter un nombre d&apos;heure d&apos;entrainement</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>heures d&apos;entrainement</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example</td>
              <td>2</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
