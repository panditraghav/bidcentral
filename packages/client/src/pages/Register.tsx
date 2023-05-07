import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
            <Card className="w-72">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register for BidMaker</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Password" type="password" />
                </CardContent>
                <CardFooter className="justify-between">
                    <Button>Register</Button>
                    <Button variant="link" asChild>
                        <Link to="/login" className="w-32">
                            Login instead
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
