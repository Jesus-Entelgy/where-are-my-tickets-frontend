import { useAuthStore } from "@/auth/store/auth.store";
import { Spinner } from "@/components/ui/spinner";
import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }:PropsWithChildren) => {
  const status = useAuthStore((state) => state.status);
  const location = useLocation();

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status">
        <Spinner className="size-6" />
        <span className="sr-only">Comprobando la sesión</span>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
