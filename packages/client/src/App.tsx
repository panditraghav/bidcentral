import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import AppBar from './components/AppBar';
import { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

type ThemeMode = 'dark' | 'light'

function getTheme(mode: ThemeMode) {
    return createTheme({
        palette: {
            mode: mode
        }
    })
}

export default function App() {
    const [mode, setMode] = useState<ThemeMode>('dark');

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        if (localTheme) {
            if (localTheme === 'dark' || localTheme === 'light')
                setMode(localTheme)
        }
    }, [])

    function toggleMode() {
        const newMode = mode === 'dark' ? 'light' : 'dark'
        setMode(newMode)
        localStorage.setItem('theme', newMode)
    }


    return (
        <>
            <ThemeProvider theme={getTheme(mode)}>
                <>
                    <CssBaseline />
                    <BrowserRouter>
                        <AppBar themeMode={mode} toggleMode={toggleMode} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </>
            </ThemeProvider>
        </>
    );
}
