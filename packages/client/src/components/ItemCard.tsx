import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from "./ui/Card";
import { ItemType } from "@/utils";
import { AspectRatio } from "./ui/AspectRatio";
import { useCountdown } from "@/hooks/countdown";
import { motion } from "framer-motion";


export default function ItemCard({ item }: { item: ItemType }) {
    const countdown = useCountdown(new Date(item.bidClosedAt))

    const isEnded = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;

    return (
        <Card className="w-72 mx-2">
            <AspectRatio ratio={1.5} className="relative">
                <CardImage src={item.image} className="mb-2 object-cover w-full h-full" />
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
                    <span>
                        {isEnded ? 'Deal Ended ' : 'Ends in '}
                    </span>
                    <span>
                        {countdown.days > 0 ? countdown.days + ' days ' : ''}
                    </span>
                    <span>
                        {countdown.hours > 0 ? countdown.hours + 'hr ' : ''}
                    </span>
                    <span>
                        {countdown.minutes > 0 ? countdown.minutes + 'min ' : ''}
                    </span>
                    <span>
                        {countdown.seconds > 0 ? countdown.seconds + 's' : ''}
                    </span>
                </motion.div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" asChild>
                    <Link to={`/item/${item.slug}`}>View</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
