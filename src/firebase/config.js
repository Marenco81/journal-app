
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJj_nStEAbNJQ_LdHeMkhLe5oK7lS-KpI",
  authDomain: "curso-react-a1203.firebaseapp.com",
  projectId: "curso-react-a1203",
  storageBucket: "curso-react-a1203.firebasestorage.app",
  messagingSenderId: "410912001452",
  appId: "1:410912001452:web:36b232fa6f84af48fe7e09"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);