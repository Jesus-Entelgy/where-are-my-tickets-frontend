import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import type { Alert } from "@/pages/chat/types/tickets";
import ChatAlertItem from "@/pages/chat/components/ChatAlertItem";

interface Props {
  alerts: Alert[];
}

const levelStyles: Record<Alert["level"], string> = {
  Crítica: "bg-destructive/10 text-destructive",
  Alta: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Media: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

const ChatAlerts = ({ alerts }: Props) => (
  <div className="flex h-full min-h-0 flex-col">
    <div className="mb-3 flex shrink-0 items-center gap-2 px-1">
      <Bell className="h-4 w-4 text-muted-foreground" />
      <h2 className="text-sm font-semibold">Alertas recientes</h2>
      <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
        {alerts.length}
      </span>
    </div>

    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-2 pr-2">
        {alerts.length ? (
          alerts.map((alert) => (
            <ChatAlertItem
              key={alert.id}
              alert={alert}
              levelStyles={levelStyles}
            />
          ))
        ) : (
          <p className="px-1 text-xs text-muted-foreground">
            Las nuevas incidencias aparecerán aquí.
          </p>
        )}
      </div>
    </ScrollArea>
  </div>
);

export default ChatAlerts;
