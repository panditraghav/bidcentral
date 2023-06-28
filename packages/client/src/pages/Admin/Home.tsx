import AddItemDialog from "@/components/AddItemDialog";
import AdminItemsTable from "@/components/AdminItemsTable";
import Container from "@/components/Container";
import AdminHomeSkeleton from "@/components/skeleton/AdminHomeSkeleton";
import { Button } from "@/components/ui/Button";
import { useUser } from "@/context/user";
import { getAllItems } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHomePage() {
    const navigate = useNavigate()
    const { user, isLoading: isUserLoading, error } = useUser()
    const { data: items, isLoading: isItemsLoading } = useQuery({ queryFn: getAllItems, queryKey: ['admin-all-items'] })
    const [dialogOpen, setDialogOpen] = useState(false)

    if (isUserLoading) {
        return <AdminHomeSkeleton />
    }
    if (error) {
        return <Container>Something went wrong!</Container>
    }
    if (!user?.userId || user.role !== 'admin') {
        navigate('/login', { relative: 'path' })
        return null;
    }
    return (
        <Container >
            <div className="flex justify-between mb-4">
                <h1 className="font-medium text-lg">Items </h1>
                <Button
                    variant="outline"
                    onClick={() => setDialogOpen(true)}
                >
                    New Item
                </Button>
            </div>
            {isItemsLoading && <span>Items Loading....</span>}
            {items?.docs && <AdminItemsTable items={items.docs} />}
            <AddItemDialog open={dialogOpen} onOpenChange={(o) => setDialogOpen(o)} />
        </Container>
    )
}
