import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout';
import AdminHome from './pages/Admin/Home';
import Home from './pages/Home';
import Item from './pages/Item';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import { paletteModeManager } from './theme/manager';
import { getLocalPaletteMode, setLocalPaletteMode } from './utils/localStorage';


function getThemeOfMode(mode: PaletteMode) {
    return createTheme({
        palette: {
            mode
        }
    })
}

export default function App() {
    const [mode, setMode] = useState<PaletteMode>('dark')

    useEffect(() => {
        const localPaletteMode = getLocalPaletteMode()

        paletteModeManager.setCurrentMode(localPaletteMode)
        setMode(localPaletteMode)

        return paletteModeManager.on('toggle', (newMode) => {
            setMode(newMode)
            setLocalPaletteMode(newMode)
        })
    }, [])

    return (
        <>
            <ThemeProvider theme={getThemeOfMode(mode)}>
                <>
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<UserLayout />} >
                                <Route path="" element={<Home />} />
                                <Route path="item/:id" element={<Item />} />
                                <Route path="login" element={<Login />} />
                                <Route path="signup" element={<SignUp />} />
                            </Route>
                            <Route path="/admin" element={<AdminLayout />} >
                                <Route path="" element={<AdminHome />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                    <ToastContainer theme={getLocalPaletteMode()} position='bottom-left' />
                </>
            </ThemeProvider>
        </>
    );
}
