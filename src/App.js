import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditProfile from "./pages/EditProfile/EditProfile";
import Error404 from "./pages/Error404/Error404";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Post from "./pages/Post/Post";
import Registration from "./pages/Registration/Registration";
import TestFormik from "./components/testFormik/TestFormik";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/:idPost" element={<Post />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/test" element={<TestFormik />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
