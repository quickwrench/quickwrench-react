import LoginPage from "@/pages/login";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto">
        <LoginPage />
      </div>
    </ThemeProvider>
  );
}
