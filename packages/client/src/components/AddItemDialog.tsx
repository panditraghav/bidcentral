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
            const res = await fetch(`${SERVER_URL}/assets`, {
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
                    <div className="space-y-2 py-2">
                        <Input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Input
                            placeholder="Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.valueAsNumber)}
                        />
                        <Input
                            placeholder="Image URL"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <div className="basis-1/4 mr-2">
                                <DatePicker
                                    date={endDate}
                                    setDate={setEndDate}
                                />
                            </div>
                            <TimePicker
                                className="basis-3/4"
                                onChange={(newHr, newMin, newSec) => {
                                    setHr(newHr)
                                    setMin(newMin)
                                    setSec(newSec)
                                }}
                            />
                        </div>
                    </div>
                </DialogHeader>
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
