import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAjJDrfH4wkktzM_tUutZcJy9FrcTfCgCg",
  authDomain: "workflow-29868.firebaseapp.com",
  projectId: "workflow-29868",
  storageBucket: "workflow-29868.appspot.com",
  messagingSenderId: "633393963029",
  appId: "1:633393963029:web:b67d68135cd2b5935cae1c",
  measurementId: "G-C51TCX815R",
  databaseURL: "https://workflow-29868-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default database;