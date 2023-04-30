import { ThemeProvider, createTheme } from "@mui/material";
import MyAppBar from "./components/AppBar";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <MyAppBar />
            </ThemeProvider>
        </>
    );
}
