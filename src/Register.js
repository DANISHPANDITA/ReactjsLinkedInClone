import { AddToPhotosRounded } from "@material-ui/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "./features/counterSlice";
import { auth, storage } from "./firebase";
import firebase from "firebase";
import "./Register.css";

function Register() {
  const { register, handleSubmit, errors } = useForm();
  const [progress, setprogress] = useState("");
  const [registerName, setregisterName] = useState("");
  const [registerMail, setregisterMail] = useState("");
  const [passwordReg, setpasswordReg] = useState("");
  const [passwordConf, setpasswordConf] = useState("");
  const [photo, setphoto] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  function buildPhotoSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("accept", "image/jpg, image/png");
    return fileSelector;
  }

  const Selectphoto = (e) => {
    e.preventDefault();
    const fileSelector = buildPhotoSelector();
    fileSelector.click();
    fileSelector.addEventListener("change", (event) => {
      const file = event.target.files[0];
      setphoto(file);
    });
  };
  const onSubmit = (data) => {
    if (passwordConf === passwordReg) {
      console.log(data);
      console.log(photo);
      if (photo) {
        const uploadTask = storage.ref(`media/${photo}.name}`).put(photo);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setprogress(progress);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                break;
              case firebase.storage.TaskState.RUNNING:
                break;
              default:
                console.log("..");
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              auth
                .createUserWithEmailAndPassword(registerMail, passwordReg)
                .then((userCredential) => {
                  // Signed in
                  var user = userCredential.user;
                  console.log(user);
                  user.updateProfile({
                    displayName: registerName,
                    photoURL: downloadURL,
                  });
                  dispatch(
                    login({
                      Name: registerName,
                      email: user.email,
                      ProfilePic: downloadURL,
                      uid: user.uid,
                    })
                  );
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(errorCode);
                  console.log(errorMessage);
                });
              setregisterName("");
              setregisterMail("");
              setphoto(null);
              setpasswordConf("");
              setpasswordReg("");
              history.push("/");
            });
          }
        );
      } else {
        alert("Passwords don't match");
      }
    }
  };
  return (
    <div className="registerPage">
      <img
        src="https://www.cbronline.com/wp-content/uploads/2016/06/linkedin.jpg"
        alt=""
        className="RegisterLogo"
      />
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          name="Name"
          ref={register({ required: true })}
          value={registerName}
          onChange={(e) => setregisterName(e.target.value)}
          className="NameRegister"
          type="text"
          placeholder="Enter Your Name"
        />
        {errors.Name && (
          <span className="errorField">This field is required</span>
        )}
        <input
          name="Email"
          ref={register({ required: true })}
          className="EmailRegister"
          value={registerMail}
          onChange={(e) => setregisterMail(e.target.value)}
          placeholder="E-Mail"
          type="email"
        />
        {errors.Email && (
          <span className="errorField">This field is required</span>
        )}
        <input
          name="Password"
          ref={register({ required: true })}
          className="setPassword"
          value={passwordReg}
          onChange={(e) => setpasswordReg(e.target.value)}
          placeholder="Set-Password"
          type="password"
        />
        {errors.Password && (
          <span className="errorField">This field is required</span>
        )}
        <input
          name="PasswordConfirm"
          ref={register({ required: true })}
          className="setPassword"
          value={passwordConf}
          onChange={(e) => setpasswordConf(e.target.value)}
          placeholder="Confirm-Password"
          type="password"
        />
        {errors.PasswordConfirm && (
          <span className="errorField">This field is required</span>
        )}
        <div className="fileinput">
          <AddToPhotosRounded className="fileInputIconPhoto" />
          <p onClick={Selectphoto}>Choose Photo</p>
        </div>

        <button className="RegisterButton" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
