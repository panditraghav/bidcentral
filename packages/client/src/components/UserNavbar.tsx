import { Link } from "react-router-dom";
import Container from "./Container";
import ToggleThemeButton from "./ToggleThemeButton";
import { Button } from "./ui/Button";
import { useUser } from "@/context/user";
import UserMenu from "./UserMenu";
import { Skeleton } from "./ui/Skeleton";

function UserLoadingSkeleton() {
    return (
        <Skeleton className="w-16 h-12" />
    )
}

function UserOrLogin({ }) {
    const { user, isLoading } = useUser()
    if (isLoading) {
        return <UserLoadingSkeleton />
    }
    if (user) {
        return <UserMenu user={user} />
    }
    return (
        <Button asChild>
            <Link to="/login">Login</Link>
        </Button>
    )
}

export default function UserNavbar() {

    return (
        <nav className="w-full sticky py-4 flex justify-center top-0 left-0 bg-background border-b z-50 mb-4">
            <Container className="w-full">
                <div className="flex items-center w-full justify-between items-center">
                    <h1 className="text-xl font-medium"><Link to="/">BidCentral</Link></h1>
                    <div className="flex items-center space-x-3">
                        <ToggleThemeButton />
                        <UserOrLogin />
                    </div>
                </div>
            </Container>
        </nav>
    );
}
