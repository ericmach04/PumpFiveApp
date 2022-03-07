// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp, app } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkN-RGuaJEqEp6y47AKU45ApG9QZBzRPA",
  authDomain: "pumpfiveios-d8110.firebaseapp.com",
  projectId: "pumpfiveios-d8110",
  storageBucket: "pumpfiveios-d8110.appspot.com",
  messagingSenderId: "586170791843",
  appId: "1:586170791843:web:25af556f8c0975b74f4c16"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

let firebaseapp;
if (firebase.apps.length === 0){
    firebaseapp = initializeApp(firebaseConfig)
}
else{
    firebaseapp = app()
}

const auth = getAuth(firebaseapp)
export { auth };