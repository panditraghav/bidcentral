import { ItemType } from "@/utils";
import { InfoIcon } from "lucide-react";
import { TableCell, TableRow } from "./ui/Table";
import { useCountdown } from "@/hooks/countdown";

export function AdminItemsTableRow({ item }: { item: ItemType }) {
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
