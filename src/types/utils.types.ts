import type { AuthStatus } from "@/auth/types/auth.types";

export type UtilsConstants = {
  GLOBAL_STATE: {
    AUTH_STATE: {
      TOKEN: string;
      STATUS: {
        CHECKING: Extract<AuthStatus, "checking">;
        AUTHENTICATED: Extract<AuthStatus, "authenticated">;
        NON_AUTHENTICATED: Extract<AuthStatus, "non-authenticated">;
      };
    };
  };
  TANSTACK_QUERY: {
    KEYS: {
      AUTH_STATUS: string;
    };
    STALE_TIME: {
      CHECK_STATUS: number;
    };
    HTTP_REQUESTS: {
            AUTH: {
                LOGIN: string;
                LOGOUT: string;
                CHECK_STATUS: string;
            },
            PROFILE: string;
        },
  };
};