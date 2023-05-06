import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Container, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';

type ThemeMode = 'dark' | 'light'

export default function MyAppBar({ themeMode, toggleMode }: { themeMode: ThemeMode, toggleMode: () => void }) {
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
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
                </Container>
            </AppBar>
        </Box>
    );
}
