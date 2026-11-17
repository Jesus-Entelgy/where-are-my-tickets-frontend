import { MonitorCog, Moon, Sun, SunMoon } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import type { Theme } from "@/pages/chat/types/theme";

interface Props {
    setTheme: (theme: Theme) => void;
    isFloating?: boolean;
}

const ThemeButton = ({ setTheme, isFloating = false }: Props) => {
  return (
    <div className={isFloating ? "fixed right-4 top-4 z-50" : ""}>
    <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size={!isFloating ? "default" : "icon"}
                aria-label="Cambiar tema"
              >
                <SunMoon className={isFloating ? "mr-2 h-4 w-4" : "h-4 w-4"} />
                {!isFloating && <span>Cambiar tema</span>}
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("light")}
            >
              <Sun className="h-4 w-4" />
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4" />
              Oscuro
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("system")}
            >
              <MonitorCog className="h-4 w-4" />
              Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default ThemeButton
