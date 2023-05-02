import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MyAppBar() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">BidMaker</Link>
                    </Typography>

                    {location.pathname !== '/login' &&
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
