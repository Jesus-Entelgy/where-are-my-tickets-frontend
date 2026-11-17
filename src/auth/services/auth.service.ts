import type { LoginFormValues, LoginRequestResponse } from "../types/auth";

export const login = async (payload: LoginFormValues): Promise<LoginRequestResponse> => {
    void payload;
    return {
        user: {
            email: 'alejandro.garcia@example.com', 
            firstName: 'Alejandro', 
            lastName: 'Garcia', 
        },
        token: "JWT",
    };
};