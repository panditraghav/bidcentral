import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setJWT } from '../utils/localStorage';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin() {
        try {
            const res = await fetch('http://localhost:3300/api/users/login',
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                }
            )
            const resJSON = await res.json()
            if (res.ok) {
                setJWT(resJSON.token)
                navigate('/')
            } else {
                toast('Wrong email or password')
            }
        } catch (error) {
            toast('Wrong email or password');
            console.log(error)
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login in
                </Typography>
                <Box component="form" onSubmit={(ev) => { ev.preventDefault() }} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Typography color="gray">
                        <Link to="/signup">
                            Don't have an account, signup?
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}
