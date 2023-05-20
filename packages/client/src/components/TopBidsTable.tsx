import { Bid } from "@/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table";


export default function TopBidsTable({ bids }: { bids?: Bid[] }) {
    if (!bids) return null;
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bids.sort((b1, b2) => b2.amount - b1.amount).map(bid => {
                    return (
                        <TableRow key={bid._id}>
                            <TableCell>{bid.user}</TableCell>
                            <TableCell>{bid.amount}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
