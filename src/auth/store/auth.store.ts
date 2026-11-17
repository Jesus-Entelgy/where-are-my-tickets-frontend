import {create} from "zustand";
import type { AuthState, LoginFormValues } from "../types/auth";
import { login } from "../services/auth.service";

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    status: "checking",
    error: null,
    initialize: () => {
        const token = localStorage.getItem("token");

        set({
            token,
            status: token ? "authenticated" : "non-authenticated",
        });
    },
    login: async (payload: LoginFormValues) => {
        set({ error: null });

        try{
            const { user, token } = await login(payload);

            localStorage.setItem("token", token);
            set({ user, token, status: "authenticated", error: null });

            return true;

        } catch (error) {
            localStorage.removeItem("token");
            set({
                user: null,
                token: null,
                status: "non-authenticated",
                error: error instanceof Error ? error.message : "No se pudo iniciar sesión.",
            });
            return false;
        }
    },
    logout: async () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, status: "non-authenticated", error: null });
    },
}));