import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import ChatSideMenu from "@/pages/chat/components/ChatSideMenu";
import ChatHeader from "@/pages/chat/components/ChatHeader";
import ChatMain from "@/pages/chat/components/ChatMain";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type {
  IncidentCreationResult,
  IncidentFormValues,
  Message,
} from "@/pages/chat/types/chat-messages";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import type { Ticket } from "@/pages/chat/types/tickets";
import { useAuthStore } from "@/auth/store/auth.store";


const simulateIncidentCreation = (
  ticketNumber: number,
): IncidentCreationResult => ({
  status: "created_and_assigned",
  ticketId: `TK-${ticketNumber}`,
  assignedTechnician: "Laura Martínez",
  createdAt: new Date().toISOString(),
});

const ChatView = () => {
  const { user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // TODO: En el futuro sera generado por el backend
  const [nextTicketNumber, setNextTicketNumber] = useState(1043);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IncidentFormValues>();

  const handleSend = ({
    application,
    description,
    reportedBy,
  }: IncidentFormValues) => {
    // console.log({application, description, reportedBy}); 

    // actualizamos estado de loader
    setIsLoading(true);
    // andimos al historial el mensaje
    setChatMessages((messages) => [
      ...messages,
      {
        role: "user",
        content: {
          text: `Usuario: ${reportedBy}. \nQuiero reportar una incidencia en ${application}. \nMotivo: ${description}.`,
        },
      },
    ]);

    // reseteamos el formulario
    reset();

    // * Simulamos un timeout para representar la creacion de la incidencia y asignacion del tecnico
    window.setTimeout(() => {

      // asignamos el numero de ticket
      const ticketNumber = nextTicketNumber;
      setNextTicketNumber((currentNumber) => currentNumber + 1);
      
      // simulamos la creacion de la incidencia
      // TODO: En el futuro sera una llamada al backend
      const result = simulateIncidentCreation(ticketNumber);

      // confirmacion
      const confirmationMessage: Message = {
          role: "assistant",
          content: {
            text:
              result.status === "created_and_assigned"
                ? `Incidencia ${result.ticketId} creada correctamente para ${application} con nivel Media. Se ha asignado al técnico ${result.assignedTechnician}.`
                : `No se pudo crear la incidencia: ${result.error}`,
            incidentCreation: result,
          },
      };

      // añadimos el mensaje de confirmacion al historial
      setChatMessages((messages) => [...messages, confirmationMessage]);
      if (result.status === "created_and_assigned") {
        const incident: Ticket = {
          id: result.ticketId,
          title: `Incidencia en ${application}`,
          application,
          level: "Media",
          description,
          reportedBy,
          createdAt: result.createdAt,
          resolvedAt: null,
          technician: result.assignedTechnician,
        };

        // añadimos la incidencia a la lista de tickets
        setTickets((currentTickets) => [incident, ...currentTickets]);
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* SIDE MENU */}
      <ChatSideMenu tickets={tickets} />

      {/* VENATANA DE CHAT */}
      <div className="flex flex-1 flex-col">
        {/* CHAT HEADER  */}
        <ChatHeader user={user!} logout={logout} />

        {/* CHAT MAIN */}
        <ChatMain chatMessages={chatMessages} isLoading={isLoading} />

        {/* INCIDENT FORM */}
        <div className="border-t bg-background">
          <div className="mx-auto max-w-4xl p-4">
            <Card className="rounded-3xl">
              <CardContent className="p-3">
                <form onSubmit={handleSubmit(handleSend)}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="application" className="text-sm font-medium">
                        Aplicación
                      </label>
                      <Input
                        className="my-2"
                        id="application"
                        {...register("application", {
                          required: "Indica la aplicación afectada",
                        })}
                        placeholder="Nombre de la aplicación"
                        disabled={isLoading}
                        aria-invalid={Boolean(errors.application)}
                        aria-describedby={
                          errors.application ? "application-error" : undefined
                        }
                      />
                      {errors.application?.message && (
                        <p id="application-error" className="text-sm text-destructive" role="alert">
                          {errors.application.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="reportedBy" className="text-sm font-medium">
                        Usuario
                      </label>
                      <Input
                      className="my-2"
                        id="reportedBy"
                        {...register("reportedBy", {
                          required: "Indica quién reporta la incidencia",
                        })}
                        placeholder="Nombre del usuario"
                        disabled={isLoading}
                        aria-invalid={Boolean(errors.reportedBy)}
                        aria-describedby={
                          errors.reportedBy ? "reportedBy-error" : undefined
                        }
                      />
                      {errors.reportedBy?.message && (
                        <p id="reportedBy-error" className="text-sm text-destructive" role="alert">
                          {errors.reportedBy.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Motivo de la incidencia
                      </label>
                      <Textarea
                      className="my-2"
                        id="description"
                        {...register("description", {
                          required: "Describe el motivo de la incidencia",
                        })}
                        placeholder="Describe qué ha ocurrido"
                        disabled={isLoading}
                        aria-invalid={Boolean(errors.description)}
                        aria-describedby={
                          errors.description ? "description-error" : undefined
                        }
                      />
                      {errors.description?.message && (
                        <p id="description-error" className="text-sm text-destructive" role="alert">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Button
                      type="submit"
                      className="flex items-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner data-icon="inline-start" />
                          Creando incidencia
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Crear incidencia
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
