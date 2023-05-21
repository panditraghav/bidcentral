import { Skeleton } from "../ui/Skeleton"

export default function TableSkeleton({ numOfRows }: { numOfRows: number }) {
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
