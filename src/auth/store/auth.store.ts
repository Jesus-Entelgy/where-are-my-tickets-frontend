import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import type { AuthState, LoginFormValues } from "../types/auth.types";
import { checkAuthStatusAction, loginAction, logoutAction } from "../actions/auth.actions";
import { constants } from "@/utils/utils";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  status: constants.GLOBAL_STATE.AUTH_STATE.STATUS.CHECKING,
  error: null,
  // * Acciones
  // 1. Login
  login: async (payload: LoginFormValues) => {

    // * 1. Limpiamos el error antes de realizar la peticion
    set({ error: null });

    // * 2. Realizamos la peticion de login
    try {

      // * 2.1. Llamamos a la accion de login
      const { user, access_token } = await loginAction(payload);

      // * 2.2. Guardamos el token en el almacenamiento local
      localStorage.setItem(constants.GLOBAL_STATE.AUTH_STATE.TOKEN, access_token);

      // * 2.3. Actualizamos el estado de la aplicacion
      set({
        user,
        token: access_token,
        status: constants.GLOBAL_STATE.AUTH_STATE.STATUS.AUTHENTICATED,
        error: null,
      });

      // * 2.4. Retornamos true para indicar que el login fue exitoso
      return true;

    } catch (error) {
      
      // * 2.5. En caso de error, eliminamos el token del almacenamiento local y actualizamos el estado de la aplicacion
      localStorage.removeItem(constants.GLOBAL_STATE.AUTH_STATE.TOKEN);

      // * 2.6. Actualizamos el estado de la aplicacion con el error
      set({
        user: null,
        token: null,
        status: constants.GLOBAL_STATE.AUTH_STATE.STATUS.NON_AUTHENTICATED,
        error:
          error instanceof Error ? error.message : "No se pudo iniciar sesión.",
      });

      // * 2.7. Retornamos false para indicar que el login fallo
      return false;
    }
  },

  // 2. Logout
  logout: async () => {
    set({ error: null });

    try {
      const { status } = await logoutAction();

      if (status < 200 || status >= 300) {
        const message = `No se pudo cerrar sesión (HTTP ${status}).`;
        set({ error: message });
        toast.error(message);
        return false;
      }

      localStorage.removeItem(constants.GLOBAL_STATE.AUTH_STATE.TOKEN);
      set({
        user: null,
        token: null,
        status: constants.GLOBAL_STATE.AUTH_STATE.STATUS.NON_AUTHENTICATED,
        error: null,
      });
      toast.success("Sesión cerrada exitosamente");
      return true;
    } catch (error) {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      const message = status
        ? `No se pudo cerrar sesión (HTTP ${status}).`
        : "No se pudo cerrar sesión.";

      set({ error: message });
      toast.error(message);
      return false;
    }
  },

  // 3. Check Auth Status
  checkAuthStatus: async () => {
    try {
      // * 1. llamamos a la accion de comprobacion del estado
      const { user, token } = await checkAuthStatusAction();

      // * 2. Guardamos el token en el almacenamiento local
      localStorage.setItem(constants.GLOBAL_STATE.AUTH_STATE.TOKEN, token);

      console.log("usuario y token regenerados");
      console.log({ user, token });

      // * 3. Actualizamos el estado de la aplicacion
      set({ user, token, status: "authenticated", error: null });

      return true;

    } catch (error) {
      localStorage.removeItem(constants.GLOBAL_STATE.AUTH_STATE.TOKEN);
      set({
        user: null,
        token: null,
        status: "non-authenticated",
        error:
          error instanceof Error
            ? error.message
            : "No se pudo verificar el estado de autenticación.",
      });

      return false;
    }
  },
}));
