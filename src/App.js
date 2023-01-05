import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import auth from "../src/common/auth";
import { store } from "../src/store/index";
import "./App.css";
import TestFormik from "./components/testFormik/TestFormik";
import Chat from "./pages/Chat/Chat";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditProfile from "./pages/EditProfile/EditProfile";
import Error404 from "./pages/Error404/Error404";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Me from "./pages/Me/Me";
import Post from "./pages/Post/Post";
import Registration from "./pages/Registration/Registration";

import User from "./pages/User/User";

function App() {
  let dispatch = useDispatch();
  const authBollean = useSelector((state) => state.auth.isAuth);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authFNC = async () => {
      await auth(dispatch);
      setCurrentUser(store.getState());
    };
    authFNC();
    setLoading(true);
  }, []);

  useEffect(() => {
    console.log(currentUser?.auth?.currentUser);
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route
          path="/post/:idPost"
          element={<Post authBollean={authBollean} currentUser={currentUser} />}
        />
        <Route path="/me/edit" element={<EditProfile />} />
        <Route path="/user/:userName" element={<User />} />
        <Route path="/user/:userName/:tabName" element={<User />} />
        <Route path="/chat/:roomId" element={<Chat />} />
        {/*  <Route path="/me" element={<Me />} /> */}
        <Route path="/test" element={<TestFormik />} />
        <Route path="/404" element={<Error404 />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
