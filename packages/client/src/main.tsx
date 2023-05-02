import { createTheme, ThemeProvider } from "@mui/material";
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from "./error";
import "./index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />
    },
]);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
)
