import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "@auth/pages/login/Login";
import ChatView from "@/pages/chat/ChatView";
import PublicOnlyRoute from "./guard/PublicOnlyRoute";
import ProtectedRoute from "./guard/ProtectedRoute";

const AuthLayout = lazy(() => import("@/auth/layouts/AuthLayout"));
const ChatLayout = lazy(() => import("@/pages/chat/layout/ChatLayout"));

export const appRouter = createBrowserRouter([
  // ruta de autentiacion
  {
    path: "/auth",
    element: (
      <PublicOnlyRoute>
        <AuthLayout />
      </PublicOnlyRoute>
    ),
    children: [
      // ruta de login
      {
        path: "login",
        element: <Login />,
      },
      // ruta por defecto en autenticacion
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  // ruta accesible tras autenticacion
  {
    path: "/ticketing-chat",
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
    children: [
      // ruta de chat
      {
        index: true,
        element: <ChatView />,
      },
    ],
  },
  // ruta por defecto
  {
    path: "*",
    element: <Navigate to="/ticketing-chat" replace />,
  },
]);
