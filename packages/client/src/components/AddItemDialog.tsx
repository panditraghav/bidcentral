import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
import TimePicker from "./TimePicker";
import { toast } from "react-toastify";
import { SERVER_URL } from "@/utils/url";
import { getAuthHeaders } from "@/utils/headers";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "./ui/Label";

function isValidInput({ name, endDate, description, imageURL, price }: {
    name: string;
    endDate?: Date;
    description: string;
    price: number | undefined;
    imageURL: string;
}): boolean {
    let isValid = true;
    if (name === '' || description === '' || imageURL === '') isValid = false;
    if (!price || price < 0) isValid = false;

    if (endDate && endDate.getTime() < Date.now()) isValid = false;

    return isValid;
}

export default function AddItemDialog({
    open,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void
}) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [endDate, setEndDate] = useState<Date>()
    const [imageURL, setImageURL] = useState('')

    const [hr, setHr] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [sec, setSec] = useState<number>(0)

    const queryClient = useQueryClient()

    async function onAdd() {
        if (!isValidInput({ name, description, imageURL, endDate, price })) {
            toast("Invalid input", { type: 'error' })
        } else {
            const res = await fetch(`${SERVER_URL}/api/assets`, {
                method: 'post',
                body: JSON.stringify({
                    name,
                    description,
                    image: imageURL,
                    price,
                    endDate,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                }
            })
            if (res.ok) {
                toast("Item added", { type: 'success' })
                onOpenChange(false)
                queryClient.invalidateQueries(['admin-all-items'])
            } else {
                toast("Some error occured", { type: 'error' })
            }
        }
    }

    useEffect(() => {
        const updatedEndDate = new Date(endDate?.getTime() || Date.now())
        if (hr) {
            updatedEndDate?.setHours(hr)
        }
        if (min) {
            updatedEndDate?.setMinutes(min)
        }
        if (sec) {
            updatedEndDate?.setSeconds(sec)
        }
        setEndDate(updatedEndDate)
    }, [hr, min, sec])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new item</DialogTitle>
                    <DialogDescription>
                        Add new items for bidding.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.valueAsNumber ? e.target.valueAsNumber : 0)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image</Label>
                        <Input
                            id="image"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Date</Label>
                        <DatePicker
                            date={endDate}
                            setDate={setEndDate}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Time</Label>
                        <TimePicker
                            className="col-span-3"
                            onChange={(newHr, newMin, newSec) => {
                                setHr(newHr)
                                setMin(newMin)
                                setSec(newSec)
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant='default'
                        onClick={onAdd}
                    >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
