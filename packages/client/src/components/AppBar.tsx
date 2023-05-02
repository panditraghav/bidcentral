import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type ThemeMode = 'dark' | 'light'

export default function MyAppBar({ themeMode, toggleMode }: { themeMode: ThemeMode, toggleMode: () => void }) {
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">BidMaker</Link>
                    </Typography>
                    <IconButton onClick={toggleMode}>
                        {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}
