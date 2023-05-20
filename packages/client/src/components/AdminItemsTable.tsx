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
                    <TableHead>Price</TableHead>
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
    const countdown = useCountdown(item.bidCloseAt)

    return (
        <TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
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
