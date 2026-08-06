import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Memuat...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}