import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBhaOZKxG0QYBQzAvA9tpTqEw8G-UNNgg8",
  authDomain: "disneyplus-clone-17fdd.firebaseapp.com",
  projectId: "disneyplus-clone-17fdd",
  storageBucket: "disneyplus-clone-17fdd.appspot.com",
  messagingSenderId: "198515984643",
  appId: "1:198515984643:web:c84fb2804d42e2a7e9c136",
  measurementId: "G-0TZ3CMFXVT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
