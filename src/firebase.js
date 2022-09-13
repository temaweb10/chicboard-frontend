import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyBoX25cVKucSQUG-VGyunYzHydWfRoCtxA",
  authDomain: "chicboard-25968.firebaseapp.com",
  projectId: "chicboard-25968",
  storageBucket: "chicboard-25968.appspot.com",
  messagingSenderId: "3657009343",
  appId: "1:3657009343:web:e752190a7f65156f4d5e0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
