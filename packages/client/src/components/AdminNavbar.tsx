import { Link } from "react-router-dom";
import Container from "./Container";
import ToggleThemeButton from "./ToggleThemeButton";

export default function AdminNavbar() {

    return (
        <nav className="w-full sticky py-3 flex justify-center top-0 left-0 bg-background">
            <Container>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium">
                        <Link to="/admin">
                            BidMaker Admin
                        </Link>
                    </h1>
                    <ToggleThemeButton />
                </div>
            </Container>
        </nav>
    );
}
