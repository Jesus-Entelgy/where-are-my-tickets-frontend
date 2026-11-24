import React, { Suspense, type PropsWithChildren } from "react";
import { Spinner } from "../ui/spinner";

const CustomLoader = ({ children }: PropsWithChildren) => {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center"
          role="status"
        >
          <Spinner className="size-6" />
          <span className="sr-only">Cargando la aplicación</span>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default CustomLoader;
