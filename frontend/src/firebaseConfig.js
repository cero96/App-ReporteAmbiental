// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVX3SQfmnCu7Vs_dg0BX9nun73qamUHPw",
  authDomain: "login-eckocheck.firebaseapp.com",
  projectId: "login-eckocheck",
  storageBucket: "login-eckocheck.firebasestorage.com",
  messagingSenderId: "413400680905",
  appId: "1:413400680905:web:115df59786e59d8039c018"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
