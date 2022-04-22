
import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCys3uKXhXKlzRYW41eAiB80NPk6jw4P9U",
  authDomain: "crud-registrotareas-react.firebaseapp.com",
  projectId: "crud-registrotareas-react",
  storageBucket: "crud-registrotareas-react.appspot.com",
  messagingSenderId: "648363765327",
  appId: "1:648363765327:web:d17519a162532e2cc5043a",
  measurementId: "G-Y88KCR9HJD"
};

firebase.initializeApp(firebaseConfig);

export {firebase}