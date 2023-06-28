import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

export default function UserLayout() {
    return (
        <>
            <AdminNavbar />
            <Outlet />
        </>
    )
}
