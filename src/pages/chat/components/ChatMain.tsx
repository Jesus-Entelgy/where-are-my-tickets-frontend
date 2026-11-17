import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChatChart } from "@chat/components/ChatChart";
import { Spinner } from "@/components/ui/spinner";
import type { Message } from "@/pages/chat/types/chat-messages";

import { cn } from "cn";

interface Props {
  chatMessages: Message[];
  isLoading: boolean;
}

// Mensaje inicial del asistente
const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: {
      text: "Indica la aplicación afectada, el motivo de la incidencia y el usuario que la reporta. Simularé la creación del ticket y la asignación de un técnico.",
    },
  },
];


const ChatMain = ({ chatMessages, isLoading }: Props) => {
  // Combinamos los mensajes iniciales con los mensajes del chat
  const messages = [...initialMessages, ...chatMessages];
  console.log({messages})

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8">
        {messages.map((message, index) => (
          <div
            key={message.id ?? `${message.role}-${index}`}
            className={cn(
              message.role === "user" ? "flex justify-end" : "flex gap-4",
              "animate__animated animate__fadeInUp"
            )}
          >
            {message.role === "assistant" && (
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}

            <div
              className={
                message.role === "user"
                  ? "flex max-w-[80%] flex-col items-end gap-3"
                  : "min-w-0 flex-1 space-y-3"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "rounded-2xl bg-primary px-4 py-3 text-primary-foreground"
                    : "rounded-xl border p-4"
                }
              >
                {message.content.text}
              </div>

              {/* {message.content.code && (
                <Card className="w-full">
                  <div className="border-b px-4 py-2 text-sm font-medium">
                    {message.content.code.language}
                  </div>
                  <CardContent className="p-4">
                    <pre className="overflow-x-auto text-sm">
                      {message.content.code.source}
                    </pre>
                  </CardContent>
                </Card>
              )} */}

              {/* {message.content.chart?.type === "radar" && <ChatChart />} */}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="animate__animated animate__fadeInUp flex gap-4" role="status" aria-live="polite">
            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 rounded-xl border p-4">
              <Spinner />
              <span>Generando respuesta</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ChatMain;
