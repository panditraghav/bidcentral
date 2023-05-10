import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "./ui/DropdownMenu";
import { User } from 'lucide-react'
import { removeJWT } from "@/utils";
import { useQueryClient } from '@tanstack/react-query'

export default function UserMenu() {
    const queryClient = useQueryClient()
    async function logout() {
        removeJWT()
        queryClient.invalidateQueries({ queryKey: ['user'] })
        location.reload()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <User />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link to="/profile">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button onClick={logout}>Logout</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <DropdownMenuPortal />
        </DropdownMenu>
    )
}
