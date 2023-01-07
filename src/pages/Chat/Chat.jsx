import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  getFirestore,
} from "firebase/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDmyY5ilyY7CGo8QadA-nKo3Ul4eAMaKN4",
  authDomain: "chicboard-chat.firebaseapp.com",
  projectId: "chicboard-chat",
  storageBucket: "chicboard-chat.appspot.com",
  messagingSenderId: "954876379549",
  appId: "1:954876379549:web:b741dc8d57a1bf19aeaf74",
  measurementId: "G-2XNGHVS9QB",
});
/* const db = getFirestore(); */
const auth = firebase.auth();
const firestore = firebase.firestore();
const db = getFirestore(firebaseConfig);

const Chat = () => {
  const [me, setMe] = useState("");
  const [isFB, setIsFB] = useState("");
  const [mongoId, setMongoId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("aa1");
      axios
        .get("/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          setMe(resp.data);

          const userRef = firestore.collection("users");
          console.log("aa2");
          setMongoId(resp.data._id);
          userRef
            .where("mongo_id", "==", resp.data._id)
            .get()
            .then(function (doc) {
              if (doc.empty) {
                console.log("No such document!");
                setIsFB(false);
                userRef.add({
                  rooms: [], // массив id комнат, в которых участвует пользователь
                  mongo_id: resp.data._id,
                });
              }
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(true);
    }
  }, []);

  return <Paper>{loading ? <RoomsList idM={mongoId} /> : <Loader />}</Paper>;
};
/* <RoomsList idM={mongoId} /> */

const RoomsList = ({ idM }) => {
  const [userData, setUserData] = useState();
  const colletionRef = collection(db, "users");

  const messagesRef = firestore.collection("users");
  const query = messagesRef.where("mongo_id", "==", `${idM}`);

  /*   const [messages] = useCollectionData(query, { idField: "id" }); */
  const [querySnap, loading, error] = useCollectionData(query, {
    idField: "id",
  });

  if (!loading) {
    console.log(querySnap[0]);
  }

  return <div>{!loading ? <div></div> : <Loader />}</div>;
};

const Room = ({ user }) => {};

/* 

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
  )

}
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}




function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>
    
    <button >🕊️</button>
    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}



function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  </>)
}
 */

export default Chat;
