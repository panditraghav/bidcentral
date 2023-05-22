import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/DropdownMenu";
import { removeJWT } from "@/utils";
import { useQueryClient } from '@tanstack/react-query'
import { User } from "@/context/user";
import UserAvatar from "./UserAvatar";

export default function UserMenu({ user }: { user: User }) {
    const queryClient = useQueryClient()
    async function logout() {
        removeJWT()
        queryClient.invalidateQueries({ queryKey: ['user'] })
        location.reload()
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center space-x-2">
                    <UserAvatar user={user} />
                    <span>{user.name}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Credit:- {user.credit} Rs
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>
                            Add Credit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Send to bank
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                    <button onClick={logout}>Logout</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <DropdownMenuPortal />
        </DropdownMenu>
    )
}
