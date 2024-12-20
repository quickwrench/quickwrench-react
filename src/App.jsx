import "./Logo.jsx";
import "./App.css";
import "./LoginPage.jsx";
import LoginPage from "./LoginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/register"
          element={<h1 style={{ color: "green" }}>Tito</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
