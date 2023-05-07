import { Container, } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ToggleThemeButton from './ToggleThemeButton';

export default function AdminAppbar() {
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
                        <Link to="/admin">BidMaker Admin</Link>
                    </Typography>
                    <ToggleThemeButton />
                </Container>
            </AppBar>
        </Box>
    );
}
