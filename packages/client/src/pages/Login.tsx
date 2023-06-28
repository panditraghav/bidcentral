import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { setJWT } from "@/utils";
import { SERVER_URL } from "@/utils/url";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    async function handleLogin(e: FormEvent) {
        e.preventDefault()
        try {
            const data = await fetch(`${SERVER_URL}/api/users/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }).then(res => res.json())

            if (data.token) {
                queryClient.invalidateQueries({ queryKey: ['user'] })
                setJWT(data.token)
                navigate('/')
            } else {
                toast('Some error occured', { type: 'error' })
            }
        } catch (error) {
            toast('Some error occured', { type: 'error' })
        }
    }

    return (
        <form
            className="w-screen h-screen flex justify-center items-center absolute top-0 left-0"
            onSubmit={handleLogin}
        >
            <Card className="w-72">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to BidCentral</CardDescription>
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
                    <Button type="submit">Login</Button>
                    <Button variant="link" asChild>
                        <Link to="/register" className="w-32">
                            Don't have an account?
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
