import { create } from "zustand";
import type { TicketsState } from "../types/tickets";
import { getAllTicketsByUser } from "../actions/tickets.actions";

export const useTicketStore = create<TicketsState>((set, get) => ({
    tickets: [],
    status: "idle",
    error: null,
    getAllTicketsByUser: async () => {
        set({ status: "loading" });

        try {
            
            const {tickets} = await getAllTicketsByUser();

            set({ tickets, status: "succeeded" });

            return tickets;

        } catch (error) {
            set({ error: JSON.stringify(error), status: "failed" });
            throw error;
        }
    }
    
}));