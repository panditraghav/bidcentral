import { Outlet } from 'react-router-dom';
import UserAppbar from '../components/UserAppbar';

export default function UserLayout() {
    return (
        <>
            <UserAppbar />
            <Outlet />
        </>
    )
}
