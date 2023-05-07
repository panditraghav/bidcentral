import { Link } from "react-router-dom";
import Container from "./Container";
import ToggleThemeButton from "./ToggleThemeButton";

export default function UserNavbar() {

    return (
        <nav className="w-full sticky py-3 flex justify-center top-0 left-0 z-40 bg-background">
            <Container>
                <div className="flex items-center w-full justify-between">
                    <h1 className="text-xl font-medium"><Link to="/">BidMaker</Link></h1>
                    <ToggleThemeButton />
                </div>
            </Container>
        </nav>
    );
}
