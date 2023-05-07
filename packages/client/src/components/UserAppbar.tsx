import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';
import ToggleThemeButton from './ToggleThemeButton';

export default function UserAppbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    return (
        <AppBar position="static" sx={{ top: 0, left: 0 }}>
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    py: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/">BidMaker</Link>
                </Typography>
                {pathname == '/login' || pathname == '/signup' ? <></> :
                    <Search />
                }
                <ToggleThemeButton />
                {pathname == '/login' || pathname == '/signup' ?
                    <></> :
                    <>
                        <Button color="primary" variant='contained' onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button color="inherit" sx={{ ml: 1 }} variant='outlined' onClick={() => navigate('/signup')}>
                            Sign Up
                        </Button>
                    </>
                }
            </Container>
        </AppBar>
    );
}
