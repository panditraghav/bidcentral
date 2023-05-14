import { Link } from "react-router-dom";
import Container from "./Container";
import ToggleThemeButton from "./ToggleThemeButton";
import { Button } from "./ui/Button";
import { useUser } from "@/context/user";
import UserMenu from "./UserMenu";

export default function UserNavbar() {
    const { user, isLoading } = useUser()

    return (
        <nav className="w-full sticky py-3 flex justify-center top-0 left-0 bg-background">
            <Container className="w-full">
                <div className="flex items-center w-full justify-between items-center">
                    <h1 className="text-xl font-medium"><Link to="/">BidMaker</Link></h1>
                    <div className="flex items-center space-x-3">
                        <ToggleThemeButton />
                        {isLoading ? 'Loading...' : ''}
                        {
                            user?.userId && !isLoading ?
                                <UserMenu />
                                : (
                                    <>
                                        <Button asChild>
                                            <Link to="/login">Login</Link>
                                        </Button>
                                        <Button variant="secondary" asChild>
                                            <Link to="/register">Register</Link>
                                        </Button>
                                    </>
                                )
                        }
                    </div>
                </div>
            </Container>
        </nav>
    );
}
