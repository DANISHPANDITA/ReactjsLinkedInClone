import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Body from "./Body";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/counterSlice";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./Register";
import { auth } from "./firebase";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            Name: user.displayName,
            email: user.email,
            AvatarPhoto: user.photoURL,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <div className="app">
          <Route path="/">
            {!user ? (
              <Login />
            ) : (
              <div className="App">
                <Navbar />
                <Body />
              </div>
            )}
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
