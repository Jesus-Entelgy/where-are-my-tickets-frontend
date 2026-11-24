import type { UtilsConstants } from "@/types/utils.types";

export const constants = {
    GLOBAL_STATE: {
        AUTH_STATE: {
            TOKEN: "token",
            STATUS: {
                CHECKING: "checking",
                AUTHENTICATED: "authenticated",
                NON_AUTHENTICATED: "non-authenticated",
            }
        },
    },
    TANSTACK_QUERY: {
        KEYS: {
            AUTH_STATUS: "auth",
        },
        STALE_TIME: {
            CHECK_STATUS: 1000 * 60 * 5, // 5 minutos
        },
        HTTP_REQUESTS: {
            AUTH: {
                LOGIN: "/auth/login",
                LOGOUT: "/auth/logout",
                CHECK_STATUS: "/auth/refresh-access-token",
            },
            PROFILE: "profile-me"
        },
    },
} as const satisfies UtilsConstants;