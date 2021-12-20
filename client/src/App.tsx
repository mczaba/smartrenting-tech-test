import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./scopes/Login/Login";

import "./App.css";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import TokenHandler from "./scopes/TokenHandler/TokenHandler";
import Dashboard from "./scopes/Dashboard/Dashboard";

// The famous nullable boolean we inherited from Java
type nullableBoolean = boolean | null;

function App() {
  const [connected, setConnected] = useState<nullableBoolean>(null);
  const { token, setToken } = useAppContext();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}hello`)
      .then(() => setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h5>{`SmartialArt`}</h5>
        <img
          src="https://www.pngall.com/wp-content/uploads/3/Karate-Silhouette-Transparent.png"
          className="App-logo"
          alt="logo"
        />
      </header>
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {token && (
            <>
              <Route path="/dashboard" component={Dashboard}></Route>
            </>
          )}
          <Route path="*" exact>
            <h1>
              API:
              {connected === true && " connected"}
              {connected === false && " not connected"}
            </h1>
            <Link className="login" to="/login">
              Login
            </Link>
          </Route>
        </Switch>
        <Route path="*" component={TokenHandler}></Route>
      </Router>
    </div>
  );
}
const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default WrappedApp;
