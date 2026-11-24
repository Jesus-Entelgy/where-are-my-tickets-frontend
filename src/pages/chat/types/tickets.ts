import type { User } from "@/auth/types/auth.types";

export type TicketLevel = "Crítica" | "Alta" | "Media";

export interface Ticket {
  id: string;
  title: string;
  application: string;
  level: TicketLevel;
  description: string;
  reportedBy: string;
  createdAt: string;
  resolvedAt: string | null;
  technician: string;
}

export interface GetTicketResponse {
  tickets: Ticket[];
}

export type TicketStatus = "idle" | "loading" | "succeeded" | "failed";

export interface TicketsState {
  tickets: Ticket[];
  status: TicketStatus;
  error: string | null;
  getAllTicketsByUser: () => Promise<Ticket[]>;
}












// TODO: sustituir por eltipado anterior
export type Ticket2Priority = "HIGH" | "MEDIUM" | "LOW" | "CRITICAL";
export type Ticket2Status =   'OPEN'|'IN_PROGRESS'|'RESOLVED'|'CLOSED';

export interface Ticket2 {
  id?: string;
  title: string;
  userId: User["id"];
  description: string;
  priority: Ticket2Priority;
  status: Ticket2Status;
  createdAt?: string;
  updatedAt?: string;
}