import { Outlet } from 'react-router-dom';
import AdminAppbar from '../components/AdminAppbar';

export default function UserLayout() {
    return (
        <>
            <AdminAppbar />
            <Outlet />
        </>
    )
}
