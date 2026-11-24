import type { User } from "@/auth/types/auth.types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Props {
  user: User;
  logout: () => Promise<boolean>;
}

const ChatHeader = ({ user, logout }: Props) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const loggedOut = await logout();
    if (loggedOut) navigate("/login");
  };

  const formatUserFallback = (user: User) => {
    const firstNameInitial = user.firstName.charAt(0).toUpperCase();
    const lastNameInitial = user.lastName.charAt(0).toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  }

  return (
    <header className="border-b px-6 py-3">
      <div className="flex justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  {/* <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" /> */}
                  <AvatarFallback>{formatUserFallback(user)}</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuItem >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                variant="destructive"
                onClick={handleLogout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default ChatHeader;
