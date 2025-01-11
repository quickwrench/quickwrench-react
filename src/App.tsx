import Login from "@/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Register from "./pages/Register";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <>
                  <h1 className="text-2xl text-center mt-10">
                    Welcome back, user!
                  </h1>
                  <h1 className="text-base text-wrap text-center mt-5 w-full">
                    <b>Access Token:</b>{" "}
                    {localStorage.getItem("accessToken")
                      ? localStorage.getItem("accessToken")?.slice(0, 50)
                      : "Null"}
                    <h2>
                      <b>Refresh Token:</b>{" "}
                      {localStorage.getItem("refreshToken")
                        ? localStorage.getItem("refreshToken")?.slice(0, 50)
                        : "Null"}
                    </h2>
                  </h1>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
