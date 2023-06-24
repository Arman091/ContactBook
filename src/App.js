import React from "react";
import { useState, useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Users from "./Components/Users";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { AuthContext } from "./Context/AuthContext";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const [screen, setScreen] = useState(window.screen.width);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  useEffect(() => {
    setScreen(window.screen.width);
    console.log(isAuthenticated);
  }, [screen]);

  return (
    <>
      <NavBar />
      <Alert alert={alert} />
      <div
        className={
          screen < 800
            ? "container w-90"
            : screen < 1200
            ? "container w-80"
            : "container w-50"
        }
      >
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login showAlert={showAlert} />}
          />

          <Route
            exact
            path="/signup"
            showAlert={showAlert}
            render={() => <SignUp showAlert={showAlert} />}
          />
          {isAuthenticated ? (
            <Route
              exact
              path="/"
              render={() => <Users showAlert={showAlert} />}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </div>
    </>
  );
};

export default App;
