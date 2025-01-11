import LoginForm from "@/components/forms/login";
import { ModeToggle } from "@/components/mode-toggle";

function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-5">
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
