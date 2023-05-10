import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@/context/theme';
import { UserProvider } from '@/context/user';
import AdminLayout from '@/layout/AdminLayout';
import UserLayout from '@/layout/UserLayout';
import UserHomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import ItemPage from './pages/Item';
import { AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient()

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <ThemeProvider>
                        <AnimatePresence>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<UserLayout />} >
                                        <Route path="" element={<UserHomePage />} />
                                        <Route path="item/:id" element={<ItemPage />} />
                                        <Route path="login" element={<LoginPage />} />
                                        <Route path="register" element={<RegisterPage />} />
                                    </Route>
                                    <Route path="/admin" element={<AdminLayout />} >
                                        <Route path="" element={<div>Admin Home</div>} />
                                    </Route>
                                    <Route path="*" element={<div>Not found</div>} />
                                </Routes>
                            </BrowserRouter>
                        </AnimatePresence>
                        <ToastContainer theme={'dark'} position='bottom-left' />
                    </ThemeProvider>
                </UserProvider>
            </QueryClientProvider>
        </>
    );
}
