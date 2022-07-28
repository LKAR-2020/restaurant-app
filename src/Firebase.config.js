// Import the functions you need from the SDKs you need

import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyB_z5ve6iU1AFo0Y5EoBj7JtGFm8C-n9-k",

  authDomain: "restaurantapp-47f65.firebaseapp.com",

  databaseURL: "https://restaurantapp-47f65-default-rtdb.firebaseio.com",

  projectId: "restaurantapp-47f65",

  storageBucket: "restaurantapp-47f65.appspot.com",

  messagingSenderId: "464609593203",

  appId: "1:464609593203:web:7a5bafdbcc4e539b996706"

};


// Initialize Firebase

 const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);
 const firestore = getFirestore(app);
 const storage = getStorage(app);
 export { app, firestore, storage };
 