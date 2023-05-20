import { AspectRatio } from "../ui/AspectRatio";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";

export default function CardSkeleton() {
    return (
        <Card className="w-72 mx-2">
            <AspectRatio ratio={1.5} className="relative">
                <Skeleton className="w-full h-full" />
            </AspectRatio >
            <CardHeader>
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-10" />
            </CardHeader>
            <CardContent>
                <Skeleton className="w-5/6 h-4" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-16" />
            </CardFooter>
        </Card>
    )
}
