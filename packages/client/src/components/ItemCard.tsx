import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { Card, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from "./ui/Card";
import { ItemType } from "@/utils";
import { AspectRatio } from "./ui/AspectRatio";


export default function ItemCard({ item }: { item: ItemType }) {
    return (
        <Card className="w-64 mx-2">
            <AspectRatio ratio={1.5}>
                <CardImage src={item.image} className="mb-2" />
            </AspectRatio >
            <CardHeader>
                <CardTitle className="">{item.name}</CardTitle>
                <CardDescription>{item.description.split(' ').slice(0, 10).join(' ')}...</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant="outline" asChild>
                    <Link to={`/item/${item.id}`}>View</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
