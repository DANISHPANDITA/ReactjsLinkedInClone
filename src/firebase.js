import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB8uP-mFSw2r-TFxTwaK7JqKRU9nXgUCHQ",
  authDomain: "linkedinclone-12080.firebaseapp.com",
  projectId: "linkedinclone-12080",
  storageBucket: "linkedinclone-12080.appspot.com",
  messagingSenderId: "59111875551",
  appId: "1:59111875551:web:d275d8a8a857468aec1a6a",
  measurementId: "G-TZS7PD09ET",
});

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const auth = firebaseApp.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, googleAuth };
