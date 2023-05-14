import { ItemType } from "@/utils";
import { InfoIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table";

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
                        <TableRow key={item._id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>1 days 2hr 10min 22sec</TableCell>
                            <TableCell><InfoIcon /></TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
