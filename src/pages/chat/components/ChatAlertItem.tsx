import { AlertTriangle, Clock3, Ticket, UserRound } from "lucide-react"
import type { Alert } from "@/pages/chat/types/tickets"

interface Props {
  alert: Alert;
  levelStyles: Record<Alert["level"], string>;
}

const dateTimeFormat = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "short",
  timeStyle: "short",
});

const MAX_LENGTH_TRUNCATE = 100;

const ChatAlertItem = ({ alert, levelStyles }: Props) => {

  const truncateText = (text: string) => (text.length <= MAX_LENGTH_TRUNCATE) ? text : text.slice(0, MAX_LENGTH_TRUNCATE) + "...";

  return (
    <article className="animate__animated animate__fadeInUp cursor-pointer space-y-2 rounded-lg border bg-background p-3 hover:bg-muted/50">
      <div className="flex flex-col items-start gap-2">

        {/* Icon + title */}
        <div className="flex items-center gap-2">
           <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
           <p className="truncate text-sm font-medium">{alert.title}</p>
        </div>

        {/* Description */}
        <div className="min-w-0">
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {truncateText(alert.description)}
          </p>
        </div>

        {/* Application and reportedBy */}
        <div className="min-w-0">
          <p className="my-2 text-s text-muted-foreground">
            <p className='font-bold'>Aplicación:</p> {alert.application}
          </p>
          <p className="my-2 text-s text-muted-foreground">
            <p className='font-bold'>Reportado por:</p> {alert.reportedBy}
          </p>
        </div>
        
      </div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span
          className="inline-flex items-center gap-1 text-muted-foreground"
          title="Código identificativo"
        >
          <Ticket className="h-3 w-3" />
          {alert.id}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 font-medium ${levelStyles[alert.level]}`}
        >
          {alert.level}
        </span>
      </div>
      <div className="space-y-1 text-xs text-muted-foreground">
        <p className="flex items-center gap-1">
          <Clock3 className="h-3 w-3" />
          Creada: {dateTimeFormat.format(new Date(alert.createdAt))}
        </p>
        <p className="flex items-center gap-1">
          <Clock3 className="h-3 w-3" />
          Resuelta:{" "}
          {alert.resolvedAt
            ? dateTimeFormat.format(new Date(alert.resolvedAt))
            : "Pendiente"}
        </p>
        <p className="flex items-center gap-1">
          <UserRound className="h-3 w-3" />
          Técnico: {alert.technician}
        </p>
      </div>
    </article>
  )
}

export default ChatAlertItem
