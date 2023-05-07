import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SERVER_URL } from "@/utils/url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: postLogin,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['user'] })
            navigate('/')
        },
        onError: () => {
            toast('Invalid username or password', { type: 'error' })
        }
    })

    function postLogin() {
        return fetch(
            `${SERVER_URL}/users/login`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }).then(res => res.json()
            )
    }
    function handleLogin() {
        mutation.mutate()
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
            <Card className="w-72">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to BidMaker</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardContent>
                <CardFooter className="justify-between">
                    <Button onClick={handleLogin}>Login</Button>
                    <Button variant="link" asChild>
                        <Link to="/register" className="w-32">
                            Don't have an account?
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}