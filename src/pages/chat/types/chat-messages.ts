export type IncidentCreationResult =
  | {
      status: "created_and_assigned";
      ticketId: string;
      assignedTechnician: string;
      createdAt: string;
    }
  | {
      status: "failed";
      error: string;
    };

export interface Message {
  id?: number;
  role: "user" | "assistant";
  content: {
    text: string;
    incidentCreation?: IncidentCreationResult;
    code?: {
      language: string;
      source: string;
    };
    chart?: {
      type: "radar";
    };
  };
}

export type IncidentFormValues = {
  application: string;
  description: string;
  reportedBy: string;
};