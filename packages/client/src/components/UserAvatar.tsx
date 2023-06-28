import { User } from "@/context/user";
import { Avatar, AvatarFallback } from "./ui/Avatar";

export default function UserAvatar({ user }: { user: User }) {
    return (
        <Avatar>
            <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
        </Avatar>
    )
}

function getAvatarFallback(name: string) {
    const nameSplit = name.split(' ')
    let fName = ''
    let lName = ''

    fName = nameSplit[0]
    if (nameSplit.length === 2) {
        lName = nameSplit[1]
    }
    let avatarFallback = ''
    avatarFallback += fName.slice(0, 1)
    avatarFallback += lName.slice(0, 1)

    return avatarFallback
}
