import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { useAuth } from "@/context/userContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DarkMode } from "./DarkMode";
import { useLogout } from "@/pages/Authentication/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Header() {
  const { userName, setUserDetails, userId } = useAuth();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(
      {},
      {
        onSuccess: () => {
          toast.success("Logged out successfully");
        },
        onError: (err) => {
          toast.error(err);
        },
      }
    );
    setUserDetails({});
    navigate("/login", { replace: true });
  };

  return (
    <header className="min-h-[60px] sticky top-0 w-full flex items-center  shadow-lg shadow-indigo-400">
      <div className="w-full flex justify-between items-center mx-2 md:mx-8 ">
        <Link to="/">
          <h1 className="font-medium text-2xl md:text-3xl italic underline underline-offset-2">
            IDEAS
          </h1>
        </Link>
        <div className="flex gap-4 items-center">
          {!userName && (
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}

          {!userName && (
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          )}

          {userName && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="hover:cursor-pointer active:cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => navigate(`/${userId}/settings`)}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DarkMode />
        </div>
      </div>
    </header>
  );
}

export default Header;
