import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout';
import { useEffect, useState } from 'react';
import { ThemeMode, getLocalTheme, setLocalTheme, setThemeClassToBody, themeManager } from './utils';
import { ThemeProvider } from './context/theme';
import UserHomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

export default function App() {
    const [mode, setMode] = useState<ThemeMode>(themeManager.themeMode)

    useEffect(() => {
        const localTheme = getLocalTheme()

        themeManager.setCurrentThemeMode(localTheme)
        setThemeClassToBody(localTheme)
        setMode(localTheme)

        return themeManager.on('toggle', (newMode) => {
            setMode(newMode)
            setLocalTheme(newMode)
            setThemeClassToBody(newMode)
        })
    })

    return (
        <>
            <ThemeProvider value={mode}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<UserLayout />} >
                            <Route path="" element={<UserHomePage />} />
                            <Route path="item/:id" element={<div>Item</div>} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />
                        </Route>
                        <Route path="/admin" element={<AdminLayout />} >
                            <Route path="" element={<div>Admin Home</div>} />
                        </Route>
                        <Route path="*" element={<div>Not found</div>} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer theme={'dark'} position='bottom-left' />
            </ThemeProvider>
        </>
    );
}
