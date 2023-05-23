import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { setJWT } from "@/utils";
import { SERVER_URL } from "@/utils/url";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const name = useInput()
    const email = useInput()
    const password = useInput()
    const rePassword = useInput()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (password.value != rePassword.value) return toast("Password doesn't match", { type: 'error' })
        try {
            const data = await fetch(`${SERVER_URL}/api/users/signup`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value
                })
            }).then(res => res.json())

            if (data.token) {
                setJWT(data.token)
                queryClient.invalidateQueries(['user'])
                navigate('/')
            } else {
                throw Error('No token!')
            }
        } catch (error) {
            console.log(error)
            toast("Some error occured", { type: 'error' })
        }
    }

    return (
        <form
            className="w-screen h-screen flex justify-center items-center absolute top-0 left-0"
            onSubmit={handleSubmit}
        >
            <Card className="w-72">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register for BidCentral</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Name" type="text" {...name} />
                    <Input placeholder="Email" type="email" {...email} />
                    <Input placeholder="Password" type="password" {...password} />
                    <Input placeholder="Reenter Password" type="password" {...rePassword} />
                </CardContent>
                <CardFooter className="justify-between">
                    <Button type="submit">Register</Button>
                    <Button variant="link" asChild>
                        <Link to="/login" className="w-32">
                            Login instead
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

function useInput(initialValue: string | undefined = '') {
    const [value, setValue] = useState(initialValue)

    return { value, onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value) }
}
