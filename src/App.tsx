// import ChatView from "./chat/ChatView"
import { useAuthStore } from "@/auth/store/auth.store"
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider"
import { Suspense, useEffect } from "react"
import { Spinner } from "./components/ui/spinner"
import {RouterProvider} from "react-router-dom";
import 'animate.css';
import { appRouter } from "./router/app.router";
import { Toaster } from 'sonner';

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center" role="status">
            <Spinner className="size-6" />
            <span className="sr-only">Cargando la aplicación</span>
          </div>
        }
      >
        <RouterProvider router={appRouter} />
      </Suspense>
    </ThemeProvider>
    <Toaster />
    </>
  )
}

export default App