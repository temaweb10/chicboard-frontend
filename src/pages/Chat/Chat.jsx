import React, { useEffect, useRef, useState } from 'react';
import {useParams} from 'react-router-dom'
import '../../App.css';
import firebase from 'firebase/compat/app';
import  'firebase/compat/firestore';
/* import { doc , query, where} from "firebase/compat/firestore"; */
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { query, orderBy, limit ,where} from "firebase/firestore";  

import axios from 'axios';

firebase.initializeApp({
  apiKey: "AIzaSyDmyY5ilyY7CGo8QadA-nKo3Ul4eAMaKN4",
  authDomain: "chicboard-chat.firebaseapp.com",
  projectId: "chicboard-chat",
  storageBucket: "chicboard-chat.appspot.com",
  messagingSenderId: "954876379549",
  appId: "1:954876379549:web:b741dc8d57a1bf19aeaf74",
  measurementId: "G-2XNGHVS9QB"
});

const auth = firebase.auth();
const firestore = firebase.firestore()




const Chat =  ()=> {

  const [me, setMe] = useState("");
  const [isFB, setIsFB] = useState("")
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("/api/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((resp) => {
          setMe(resp.data);

          const userRef =  firestore.collection('users')     
          const mongo_id = resp.data._id
          /* userRef.where("mongo_id", "==", '635e845e8fe1a6722a37b4c7').get() */
         
          userRef.where("mongo_id", "==", mongo_id).get().then(function(doc) {
                
            if (doc.empty) {
                console.log("No such document!");
                setIsFB(false)
                userRef.add({
                  
                  rooms: [], // массив id комнат, в которых участвует пользователь
                  mongo_id:mongo_id
                })
            }

          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
        setLoading(true)
        })
        .catch((err) => {
          console.log(err);
        
        });
    
  }
 
  }, []);


 /*  const q = query(firestore.collection('users') , where("mongo_id", "=", '100000')) */

 /*  const test = async ()=>{
    const snapshot = await firestore.collection('users').where("mongo_id", "==", '635e845e8fe1a6722a37b4c7').get();
    snapshot.forEach(doc=> {
      console.log(doc.data())
  })
  }

  test() */
 
  return (
    <div className="App">
      <header>
        <h1>sex</h1>
      {/*   <SignOut /> */}
      </header>

      <section>
       {/*  {user ? <ChatRoom /> : <SignIn />} */}
      </section>

    </div>
  );
}







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




export default Chat

