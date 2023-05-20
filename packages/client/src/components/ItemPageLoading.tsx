import Container from "./Container";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { Skeleton } from "./ui/Skeleton";

export default function ItemPageLoading() {
    return (
        <Container>
            <div className="flex w-full md:flex-row flex-col">
                <div className="basis-1/2 mr-4 h-full space-y-5">
                    <AspectRatio ratio={1.5}>
                        <Skeleton className="w-full h-full" />
                    </AspectRatio>
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="w-full h-44" />
                </div>
                <div className="basis-2/3 relative">
                    <Skeleton className="h-12 w-40 my-4" />
                    <TableSkeleton numOfRows={5} />
                    <div className="flex justify-between items-center sticky bottom-0 right-0 w-full">
                        <div className="basis-1/2">
                            <HighestBidSkeleton />
                        </div>
                        <BidButtonSkeleton />
                    </div>
                </div>
            </div>
        </Container >
    )
}

function TableSkeleton({ numOfRows }: { numOfRows: number }) {
    const rows: JSX.Element[] = []
    for (let i = 0; i < numOfRows; i++) {
        rows.push(<Skeleton className="my-4 h-6 w-full" key={i} />)
    }
    return (
        <>
            {rows}
        </>
    )
}

function HighestBidSkeleton() {
    return (
        <div
            className="flex"
        >
            <Skeleton className="h-6 w-28 mr-2" />
            <span>
                <Skeleton className="h-6 w-16" />
            </span>
        </div>
    )
}

function BidButtonSkeleton() {
    return (
        <div className="my-4 flex items-center ">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-10 w-24 mx-3" />
            <Skeleton className="h-6 w-12" />
        </div>
    )
}
