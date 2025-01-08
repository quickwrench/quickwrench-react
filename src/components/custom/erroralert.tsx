import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

type ErrorAlertProps = {
  error: string | null;
};

function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <div className="flex items-start gap-1">
        <AlertCircle className="h-4" />
        <AlertTitle>{error}</AlertTitle>
      </div>
    </Alert>
  );
}

export default ErrorAlert;
