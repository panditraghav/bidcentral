import { Link } from "react-router-dom";
import Container from "./Container";
import ToggleThemeButton from "./ToggleThemeButton";
import { Button } from "./ui/Button";
import { useUser } from "@/context/user";

export default function UserNavbar() {
    const user = useUser()
    console.log('User from navbar:- ', user)

    return (
        <nav className="w-full sticky py-3 top-0 left-0 z-40 bg-background">
            <Container>
                <div className="flex items-center w-full justify-between items-center">
                    <h1 className="text-xl font-medium"><Link to="/">BidMaker</Link></h1>
                    <div className="flex items-center space-x-3">
                        <ToggleThemeButton />
                        {
                            user?.userId ? <span>User</span> : (
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
