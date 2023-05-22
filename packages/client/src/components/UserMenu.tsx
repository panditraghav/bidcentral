import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/DropdownMenu";
import { removeJWT } from "@/utils";
import { useQueryClient } from '@tanstack/react-query'
import { User } from "@/context/user";
import UserAvatar from "./UserAvatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/Dialog";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { SERVER_URL } from "@/utils/url";
import { toast } from "react-toastify";
import { getAuthHeaders } from "@/utils/headers";

export default function UserMenu({ user }: { user: User }) {
    const [showAddCreditDialog, setShowAddCreditDialog] = useState(false)
    const [showTransferCreditDialog, setShowTransferCreditDialog] = useState(false)

    const queryClient = useQueryClient()
    async function logout() {
        removeJWT()
        queryClient.invalidateQueries({ queryKey: ['user'] })
        location.reload()
    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar user={user} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="flex items-center space-x-2">
                        <UserAvatar user={user} />
                        <span>{user.name}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Credit:- &#8377; {user.credit}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem
                                onClick={() => setShowAddCreditDialog(true)}
                            >
                                Add Credit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setShowTransferCreditDialog(true)}
                            >
                                Transfer to bank
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <button onClick={logout}>Logout</button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                <DropdownMenuPortal />
            </DropdownMenu>
            <AddCreditDialog
                open={showAddCreditDialog}
                onOpenChange={(open) => setShowAddCreditDialog(open)}
            />
            <TransferCreditDialog
                open={showTransferCreditDialog}
                onOpenChange={(open) => setShowTransferCreditDialog(open)}
            />
        </>
    )
}

function AddCreditDialog({ open, onOpenChange }: { open?: boolean, onOpenChange: (open: boolean) => void }) {
    const [amount, setAmount] = useState<number>(0)

    async function handleContinue() {
        try {
            const res = await fetch(`${SERVER_URL}/api/assets/checkout-session/${amount}`, {
                headers: {
                    ...getAuthHeaders()
                }
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                // onOpenChange(false)
                console.log("OK")
            } else {
                toast('Some error occured', { type: 'error' })
            }
        } catch (error) {
            toast('Some error occured', { type: 'error' })
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Credit</DialogTitle>
                    <DialogDescription>Enter credit amount to add</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                        Amount
                    </Label>
                    <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.valueAsNumber ? e.target.valueAsNumber : 0)}
                        className="col-span-3"
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleContinue}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function TransferCreditDialog({ open, onOpenChange }: { open?: boolean, onOpenChange: (open: boolean) => void }) {
    const [amount, setAmount] = useState<number>(0)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Transfer Credit</DialogTitle>
                    <DialogDescription>Enter credit amount to transfer to bank</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                        Amount
                    </Label>
                    <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.valueAsNumber ? e.target.valueAsNumber : 0)}
                        className="col-span-3"
                    />
                </div>
                <DialogFooter>
                    <Button>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
