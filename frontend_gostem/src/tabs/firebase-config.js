import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC5KOvH5rijiRFvHZ-DuuYg4DiwoRM7sYk",
    authDomain: "gostem-7f15d.firebaseapp.com",
    projectId: "gostem-7f15d",
    storageBucket: "gostem-7f15d.firebasestorage.app",
    messagingSenderId: "426848723929",
    appId: "1:426848723929:web:98a6fba4c8afc1ae012fc8",
    measurementId: "G-B5BPQKHS10"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
