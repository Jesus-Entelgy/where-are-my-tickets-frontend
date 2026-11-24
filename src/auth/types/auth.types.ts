// FORMULARIOS
export interface LoginFormValues {
  email: string;        // alejandro.garcia@example.com
  password: string;     // 12345678
}

// Usuario
export type UserRole = "ADMIN" | "USER";

export interface User {
  id?: string;
  email: string;      
  firstName: string;
  lastName: string;
  role: UserRole;
}

// AUTH STATE
export type AuthStatus = "checking" | "authenticated" | "non-authenticated";

export type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    status: AuthStatus;
    error: string | null;
    // Getters
    // Actions
    login: (payload: LoginFormValues) => Promise<boolean>;
    logout: () => Promise<boolean>;
    checkAuthStatus: () => Promise<boolean>;
};


// ACTIONS
export interface CheckAuthStatusActionResponse {
  user: User;
  token: string;
}

export interface GetProfileDataActionResponse {
  user: User;
}

// HTTPS REQUESTS - LOGIN
export interface LoginRequestResponse {
  user: User;
  access_token: string;
}

export interface CheckAuthStatusResponse {
  access_token: string;
}
