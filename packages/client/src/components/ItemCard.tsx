import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from "./ui/Card";
import { ItemType } from "@/utils";
import { AspectRatio } from "./ui/AspectRatio";
import { useCountdown } from "@/hooks/countdown";
import { motion } from "framer-motion";


export default function ItemCard({ item }: { item: ItemType }) {
    const countdown = useCountdown(item.endDate)

    return (
        <Card className="w-64 mx-2">
            <AspectRatio ratio={1.5}>
                <CardImage src={item.image} className="mb-2" />
            </AspectRatio >
            <CardHeader>
                <CardTitle className="">{item.name}</CardTitle>
                <CardDescription>{item.description.split(' ').slice(0, 10).join(' ')}...</CardDescription>
            </CardHeader>
            <CardContent>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-sm"
                    key={countdown.hours}
                >
                    Ends in {countdown.days} days {countdown.hours}hr {countdown.minutes}min {countdown.seconds}s
                </motion.div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" asChild>
                    <Link to={`/item/${item.id}`}>View</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
