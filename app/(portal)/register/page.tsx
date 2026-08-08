import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Memuat...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}