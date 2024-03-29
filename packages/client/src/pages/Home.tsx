import Container from "@/components/Container";
import ItemCard from "@/components/ItemCard";
import HomePageSkeleton from "@/components/skeleton/HomePageSkeleton";
import { getAllItems } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function UserHomePage() {
    const { data: items, isLoading } = useQuery({ queryFn: getAllItems, queryKey: ['all-items'] })

    if (isLoading) {
        return <HomePageSkeleton />
    }

    return (
        <Container className="my-8">
            <div className="flex space-y-3 flex-wrap justify-center">
                {!isLoading && items && items.docs.map((item) => {
                    return < ItemCard item={item} key={item._id} />
                })}
            </div>
        </Container >
    )
}
