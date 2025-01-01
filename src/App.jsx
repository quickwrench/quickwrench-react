import "./Logo.jsx";
import "./App.css";
import "./LoginPage.jsx";
import LoginPage from "./LoginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserReg from "./UserReg.jsx";
import WorkShop from "./Workshop.jsx";
import Register from "./Register.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/profile"
          element={<h1 style={{ color: "white" }}>profile page</h1>}
        />
        <Route path="/register" element={<UserReg />} />
        <Route path="/workshop" element={<WorkShop />} />
        <Route path="/reg" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
