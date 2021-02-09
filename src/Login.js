import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "./features/counterSlice";
import { auth } from "./firebase";
import "./Login.css";
function Login() {
  const history = useHistory();
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");
  const dispatch = useDispatch();
  const register = () => {
    history.push("/register");
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(emailInput, passwordInput)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        dispatch(
          login({
            Name: user.displayName,
            email: user.email,
            AvatarPhoto: user.photoURL,
            uid: user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="LoginPage">
      <img
        src="https://www.cbronline.com/wp-content/uploads/2016/06/linkedin.jpg"
        alt=""
        className="LoginLogo"
      />
      <input
        value={emailInput}
        onChange={(e) => setemailInput(e.target.value)}
        className="EmailInput"
        type="email"
        placeholder="Email"
      />
      <input
        className="PasswordInput"
        value={passwordInput}
        onChange={(e) => setpasswordInput(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button onClick={handleLogin} className="loginButton" type="submit">
        Login
      </button>
      <p className="notamember">
        Not a member?{" "}
        <span onClick={register} className="registerLink">
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
