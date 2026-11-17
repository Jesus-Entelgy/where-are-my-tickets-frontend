export type AlertLevel = "Crítica" | "Alta" | "Media";

export interface Alert {
  id: string;
  title: string;
  application: string;
  level: AlertLevel;
  description: string;
  reportedBy: string;
  createdAt: string;
  resolvedAt: string | null;
  technician: string;
}