import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyCLVTWTOXJZefwp8hW8mvd-K0f_ZUc-7tg",
    authDomain: "fir-todo-6e794.firebaseapp.com",
    projectId: "fir-todo-6e794",
    storageBucket: "fir-todo-6e794.appspot.com",
    messagingSenderId: "211881193381",
    appId: "1:211881193381:web:21f61e375d03dee38dc24c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export default firebase;