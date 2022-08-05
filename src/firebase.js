// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUeyBW2LUn2pbvSCcjcknup8FKfGuuat4",
  authDomain: "react-clone-b51bb.firebaseapp.com",
  projectId: "react-clone-b51bb",
  storageBucket: "react-clone-b51bb.appspot.com",
  messagingSenderId: "763254819527",
  appId: "1:763254819527:web:8f240a3b41d74f37cf0ce2",
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export { auth, db };
