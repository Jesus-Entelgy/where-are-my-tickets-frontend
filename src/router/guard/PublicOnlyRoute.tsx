import { useAuthStore } from "@/auth/store/auth.store"
import { Spinner } from "@/components/ui/spinner";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({children}: PropsWithChildren) => {
  const status = useAuthStore((state) => state.status);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status">
        <Spinner className="size-6" />
        <span className="sr-only">Comprobando la sesión</span>
      </div>
    );
  }

  if (status === "authenticated") {
    return <Navigate to="/ticketing-chat" replace />;
  }

  return children;
}

export default PublicOnlyRoute;
