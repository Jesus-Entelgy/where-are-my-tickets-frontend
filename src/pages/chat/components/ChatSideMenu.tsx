import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/hooks/useTheme";
import { Plus, TicketCheck } from "lucide-react";
import ChatAlerts from "@/pages/chat/components/ChatAlerts";
import ThemeButton from "@/components/ThemeButton/ThemeButton";
import type { Alert } from "@/pages/chat/types/alerts";

interface Props {
  alerts: Alert[];
}

const ChatSideMenu = ({ alerts }: Props) => {
  console.log(alerts)
  const { setTheme } = useTheme();

  return (
    <aside className="flex h-full w-72 min-h-0 flex-col gap-3 border-r bg-muted/20 p-3">
      <section className="shrink-0 space-y-3 rounded-xl border bg-background p-3">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <TicketCheck className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Ticketing</p>
            <p className="truncate text-xs text-muted-foreground">
              Gestión inteligente
            </p>
          </div>
        </div>

        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo chat
        </Button>
      </section>

      <section className="flex min-h-0 basis-[30%] flex-col rounded-xl border bg-background p-3">
        <h2 className="mb-2 px-1 text-xs font-medium text-muted-foreground">
          Historial
        </h2>
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              Diseño Chat IA
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              React + Tailwind
            </Button>
          </div>
        </ScrollArea>
      </section>

      <section className="min-h-0 flex-1 rounded-xl border bg-background p-3">
        <ChatAlerts alerts={alerts} />
      </section>

      <section className="shrink-0 rounded-xl border bg-background p-3">
        <ThemeButton setTheme={setTheme}  />
      </section>
    </aside>
  );
};

export default ChatSideMenu;
