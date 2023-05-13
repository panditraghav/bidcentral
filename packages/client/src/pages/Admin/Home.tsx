import Container from "@/components/Container";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/user";

export default function AdminHomePage() {
    const navigate = useNavigate()
    const { user, isLoading, error } = useUser()

    console.log(user, isLoading, error)
    if (isLoading) {
        return <Container>Loading....</Container>
    }
    if (error) {
        return <Container>Something went wrong!</Container>
    }
    if (!user?.userId || user.role !== 'admin') {
        navigate('/admin/login', { relative: 'path' })
        return null;
    }
    return (
        <Container >
            <h1>Admin Home </h1>
        </Container>
    )
}
