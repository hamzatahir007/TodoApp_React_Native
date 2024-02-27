// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOZrB4WsQMxsm-CNKX5rG9hJOcsDewDpk",
  authDomain: "react-native-todo-app-db583.firebaseapp.com",
  databaseURL: "https://react-native-todo-app-db583-default-rtdb.firebaseio.com",
  projectId: "react-native-todo-app-db583",
  storageBucket: "react-native-todo-app-db583.appspot.com",
  messagingSenderId: "213282940339",
  appId: "1:213282940339:web:cd191271d8c3635376d7c6",
  measurementId: "G-JYKWYC3J62"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app