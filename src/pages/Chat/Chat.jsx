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

const auth = firebase.auth();
const firestore = firebase.firestore();
const db = getFirestore(firebaseConfig);

const Chat = ({ to }) => {
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
          console.log(resp.data._id);
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

          userRef
            .where("mongo_id", "==", to)
            .get()
            .then(function (doc) {
              if (doc.empty) {
                console.log("No such document!");
                setIsFB(false);
                userRef.add({
                  rooms: [], // массив id комнат, в которых участвует пользователь
                  mongo_id: to,
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
      console.log(mongoId);
      setLoading(true);
    }
  }, []);

  return <div>{loading ? <ChatRoom meId={mongoId} to={to} /> : ""}</div>;
};

function ChatRoom({ to, meId }) {
  console.log(meId, to);
  let [loadingFB, setLoadingFB] = useState(false);
  let [callOne, setCallOne] = useState(false);
  const roomsRef = firestore.collection("rooms");
  const msgRef = firestore.collection("messages");
  const query = roomsRef.where("users", "in", [[meId, `${to}`]]);

  let [querySnap, loadingQ, error] = useCollectionData(query, {
    idField: "id",
  });

  useEffect(() => {
    if (querySnap !== undefined) {
      if (!loadingQ == true) {
        if (querySnap.length <= 0) {
          if (callOne !== true) {
            setCallOne(true);
            console.log("users", [meId, to]);
            roomsRef
              .add({
                ts: firebase.firestore.FieldValue.serverTimestamp(),
                users: [meId, to],
              })
              .then(function (docRef) {
                firebase
                  .firestore()
                  .collection("users")
                  .where("mongo_id", "==", meId)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (document) {
                      console.log(document.data());
                      console.log("aaaaaaAAAA", docRef.id);
                      document.ref.update({
                        rooms: [...document.data().rooms, docRef.id],
                      });
                    });
                  });

                firebase
                  .firestore()
                  .collection("users")
                  .where("mongo_id", "==", to)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (document) {
                      document.ref.update({
                        rooms: [...document.data().rooms, docRef.id],
                      });
                    });
                  });

                msgRef.add({
                  roomId: docRef.id,
                  msgArr: [],
                });
              });
          }
        }
        setLoadingFB(true);
      }
    }
  }, [loadingQ]);

  /*  .update({
      rooms: [1, 1],
    }); */
  return (
    <>
      {loadingFB ? <MessagesList to={to} meId={meId} /> : <Loader />}
      <main></main>

      <button>🕊️</button>
    </>
  );
}

/* let query = roomsRef.where("users", "in", [[meId, `${to}`]]);

      let [querySnap, loadingQ, error] = useCollectionData(query, {
        idField: "id",
      }); */

const MessagesList = ({ to, meId }) => {
  let [roomId, setRoomId] = useState("rvUPm04ltlKV86wZAIF2");
  let [loadingFetch, setLoadingFetch] = useState(false);

  const roomsRef = firestore.collection("rooms");
  const msgRef = firestore.collection("messages");
  const query = roomsRef.where("users", "in", [[meId, to]]);

  const messagesRef = firestore.collection("messages");
  const queryMsg = messagesRef.where("roomId", "==", "rvUPm04ltlKV86wZAIF2");

  const [messages] = useCollectionData(queryMsg, { idField: "id" });

  const [text, setText] = useState({
    text: "",
  });

  let [querySnap, loadingQ, error] = useCollectionData(query, {
    idField: "id",
  });

  useEffect(() => {
    if (querySnap !== undefined) {
      if (!loadingQ == true) {
        firebase
          .firestore()
          .collection("rooms")
          .where("users", "in", [[meId, to]])
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (document) {
              console.log(document.id);
              setRoomId(document.id);
            });
          });
      }
      setLoadingFetch(true);
    }
  }, [loadingQ]);
  console.log(messages);

  const sendMessage = async (e) => {
    firebase
      .firestore()
      .collection("messages")
      .where("roomId", "==", "rvUPm04ltlKV86wZAIF2")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (document) {
          /*  console.log([
            ...document.data().msgArr,
            { ...inputValues, id: meId },
          ]); */
          document.ref.update({
            msgArr: [
              ...document.data().msgArr,
              {
                text: text.text,
                id: meId,
              },
            ],
          });
        });
      });
    /*   await queryMsg.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...inputValues,
    }); */
  };

  return (
    <div>
      {loadingFetch ? (
        <div>
          <button onClick={sendMessage}>отправить</button>
          <input onChange={(e) => setText({ ...text, text: e.target.value })} />

          {messages[0].msgArr &&
            messages[0].msgArr.map((msg) => (
              <ChatMessage
                key={`${Date.now()}_post${Math.random(10)}`}
                meId={meId}
                msg={msg}
              />
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

function ChatMessage({ msg, meId }) {
  const messageClass = msg.id === meId ? "sent" : "received";
  console.log(msg);
  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>{msg.text}</p>
      </div>
    </>
  );
}

/* const Chat = () => {
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
}; */
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
