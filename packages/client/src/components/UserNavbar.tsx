import Container from "./Container";
import ToggleThemeButton from "./ToggleThemeButton";

export default function UserNavbar() {

    return (
        <nav className="w-full sticky px-4 py-3 flex justify-center top-0 left-0">
            <Container>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium">BidMaker</h1>
                    <ToggleThemeButton />
                </div>
            </Container>
        </nav>
    );
}
