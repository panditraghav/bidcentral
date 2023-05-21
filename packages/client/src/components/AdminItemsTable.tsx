import { ItemType } from "@/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table";
import { InfoIcon } from "lucide-react";
import { useCountdown } from "@/hooks/countdown";


export default function AdminItemsTable({ items }: { items: ItemType[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Starting Price</TableHead>
                    <TableHead>Highest Bid</TableHead>
                    <TableHead>Time Remaining</TableHead>
                    <TableHead>More Info</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map(item => {
                    return (
                        <AdminItemsTableRow item={item} key={item._id} />
                    )
                })}
            </TableBody>
        </Table>
    )
}

function AdminItemsTableRow({ item }: { item: ItemType }) {
    const countdown = useCountdown(new Date(item.bidClosedAt))

    const isTimeEnded = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0

    return (
        <TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.currentBid}</TableCell>
            <TableCell>
                {isTimeEnded && <span>Times Up</span>}
                <span>
                    {countdown?.days > 0 ? countdown.days + ' days ' : ''}
                </span>
                <span>
                    {countdown?.hours > 0 ? countdown.hours + 'hr ' : ''}
                </span>
                <span>
                    {countdown?.minutes > 0 ? countdown.minutes + 'min ' : ''}
                </span>
                <span>
                    {countdown.seconds > 0 ? countdown.seconds + 's' : ''}
                </span>
            </TableCell>
            <TableCell><InfoIcon /></TableCell>
        </TableRow>
    )
}
