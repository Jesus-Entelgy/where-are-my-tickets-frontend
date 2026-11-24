import { ticketingApi } from "@/api/ticketing-api";
import type { GetTicketResponse } from "../types/tickets";

export const getAllTicketsByUser = async () => {
    // 3. proceso asincrono
    try {
        // peticion HTTP
        const { data } = await ticketingApi.get<GetTicketResponse>("/tickets");

        return data;

    } catch (error) {
        console.error({ error });
        // borramos el token del almacenamiento
        localStorage.removeItem("token");
        // lanzamos el error
        throw new Error(
            `El token ha expirado o no es valido: ${JSON.stringify(error)}`,
            { cause: error },
        );
    }

};