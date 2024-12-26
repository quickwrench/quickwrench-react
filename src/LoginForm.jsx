import client from "./api/client.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import "./loginBtn.css";
export default function Login_form() {
  const [emailInput, setemailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await client.post("/accounts/login/", {
        email: emailInput,
        password: passInput,
      });

      // Save tokens to localStorage or any secure storage mechanism
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      navigate("/profile");
      // Redirect user or update app state
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="login"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "30%",
            width: "40%",
            justifySelf: "center",
            alignSelf: "center",
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            action="post"
          >
            <ErrorMessage message={error} />
            <input
              type="text"
              placeholder="EMAIL"
              value={emailInput}
              onChange={(event) => {
                setemailInput(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={passInput}
              onChange={(event) => {
                setPassInput(event.target.value);
              }}
            />
            <input
              type="submit"
              className="button"
              to="/profile"
              value="Login"
            />
          </form>
          <div style={{ marginTop: "10px" }}>
            <span>don`t have an account? </span>
            <a href=""> sign up</a>
          </div>
        </div>
      </div>
    </>
  );
}
