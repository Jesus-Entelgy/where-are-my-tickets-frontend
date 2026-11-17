// FORMULARIOS
export interface LoginFormValues {
  email: string;
  password: string;
}

// Usuario
export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
}

// AUTH STATE
export type AuthStatus = "checking" | "authenticated" | "non-authenticated";

export type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    status: AuthStatus;
    error: string | null;
    initialize: () => void;
    // Getters
    // Actions
    login: (payload: LoginFormValues) => Promise<boolean>;
    logout: () => Promise<void>;
};

// HTTPS REQUESTS - LOGIN
export interface LoginRequestResponse {
  user: User;
  token: string;
}
// Services
// export interface LoginServiceResponse
