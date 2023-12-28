import { boot } from "quasar/wrappers";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = process.env.FIREBASE_CONFIG || {
  apiKey: "AIzaSyAspP9qH0zNp5gXJw3ZyY2U_686w7pjJLo",
  authDomain: "qweeter-app.firebaseapp.com",
  databaseURL: "https://qweeter-app-default-rtdb.firebaseio.com",
  projectId: "qweeter-app",
  storageBucket: "qweeter-app.appspot.com",
  messagingSenderId: "258079375231",
  appId: "1:258079375231:web:ed6709e9137ecebd65644a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getFirestore(app);

export { database };
