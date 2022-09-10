import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Error404 from "./pages/Error404/Error404";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Registration from "./pages/Registration/Registration";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
