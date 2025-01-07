import LoginForm from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";
import logo from "@/assets/react.svg";

function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 pb-10">
        <img src={logo} alt="Logo" className="h-32" />
        <div className="w-full max-w-lg">
          <LoginForm />
        </div>
      </div>
      <div className="absolute top-0 right-0 m-1">
        <ModeToggle />
      </div>
    </>
  );
}

export default Login;
