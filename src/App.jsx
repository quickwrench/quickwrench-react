import "./Logo.jsx";
import "./App.css";
import "./LoginPage.jsx";
import LoginPage from "./LoginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserReg from "./UserReg.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/profile"
          element={<h1 style={{ color: "green" }}>profile page</h1>}
        />
        <Route path="/userReg" element={<UserReg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
