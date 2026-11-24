/**
 * Custom hook donde llamamos al store de zustand
 * En este hook se realizara el llamado de la funcion del estado encargado de comprobar el estado
 * 
 */

import { useAuthStore } from "@/auth/store/auth.store";
import { constants } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

export const useCheckStatus = () => {
    // 1. llamamos al store desestructurando la funcion
    const { checkAuthStatus } = useAuthStore();

    // 2. devolvemos la peticion con tanstack
    return useQuery({
        queryKey: [constants.TANSTACK_QUERY.KEYS.AUTH_STATUS],
        // llamamos a la funcion del store que se encargara de comprobar el estado
        queryFn: checkAuthStatus,
        // si fall la peticion no reintentamos
        retry: false,
        // establecemos un periodo de tiempo para que la peticion se considere stale
        staleTime: constants.TANSTACK_QUERY.STALE_TIME.CHECK_STATUS,
        // al volver a la pestaña no reintentamos la peticion
        refetchOnWindowFocus: false,
    })
};