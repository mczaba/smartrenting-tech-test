import React, { useState } from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";

import "./Login.css";

type responseBody = {
  status: "error" | "ok";
  message?: string;
  token?: string;
  userId?: number;
};

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleError = (error: string) => {
    setError(error);
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const body = { username, password };
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}auth/login`,
      options
    );
    const responseBody: responseBody = await response.json();
    if (responseBody.status === "error")
      return handleError(responseBody.message);
    console.log(responseBody)
    localStorage.setItem(
      "token",
      JSON.stringify({
        userId: responseBody.userId,
        token: responseBody.token,
        expireDate: dayjs().add(1, "hour")
      })
    );
    history.push("/dashboard");
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
