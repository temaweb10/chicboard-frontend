import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyDmyY5ilyY7CGo8QadA-nKo3Ul4eAMaKN4",
  authDomain: "chicboard-chat.firebaseapp.com",
  projectId: "chicboard-chat",
  storageBucket: "chicboard-chat.appspot.com",
  messagingSenderId: "954876379549",
  appId: "1:954876379549:web:b741dc8d57a1bf19aeaf74",
  measurementId: "G-2XNGHVS9QB"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);
export default firebase