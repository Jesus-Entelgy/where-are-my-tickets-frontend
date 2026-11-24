// import ChatView from "./chat/ChatView"
import { type PropsWithChildren } from "react";
import {RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import CustomLoader from "./components/CustomLoader/CustomLoader";
import { appRouter } from "./router/app.router";
import { useCheckStatus } from "./hooks/useCheckStatus";
import { Toaster } from 'sonner';
import 'animate.css';

// * Generamos el queryClient
const queryClient = new QueryClient();

// * Proveedor de contexto para verificar el estado de autenticación
const CheckAuthProvider = ({ children }: PropsWithChildren) => {
    // 1. llamamos al custom hook que nos proveera el estado de carga
    const { isLoading } = useCheckStatus();

    // 2. Si el estado de carga de la peticion de tanstack esta en proceso mostramos el loader
    if(isLoading) return <CustomLoader />

    // 3. Si no hay carga, retornamos los children
    return children;
  };


export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    {/* Proveedor del Tema */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Incorporacion del Toaster */}
      <Toaster />
      {/* Custom Provider para argar el checkStatus */}
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
    </ThemeProvider>
    
    </QueryClientProvider>
  )
}

export default App;
