import Container from "@/components/Container";
import ItemCard from "@/components/ItemCard";
import { items } from "@/utils";

export default function UserHomePage() {
    return (
        <Container className="my-8">
            <div className="flex space-y-3 flex-wrap justify-start">
                {items.map((item) => (
                    <ItemCard item={item} key={item.id} />
                ))}
            </div>
        </Container >
    )
}
