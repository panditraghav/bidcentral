import Container from "../Container";
import { Skeleton } from "../ui/Skeleton";
import TableSkeleton from "./TableSkeleton";

export default function AdminHomeSkeleton() {
    return (
        <Container>
            <div className="flex justify-between">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-12 w-20" />
            </div>
            <TableSkeleton numOfRows={10} />
        </Container>
    )
}
