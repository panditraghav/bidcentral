import { ItemType } from "@/utils";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/Table";
import { AdminItemsTableRow } from "./AdminItemsTableRow";

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
