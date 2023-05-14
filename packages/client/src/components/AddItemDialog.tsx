import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import TimePicker from "./TimePicker";


export default function AddItemDialog({
    open,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void
}) {
    const [name, setName] = useState('')
    const [endDate, setEndDate] = useState<Date>()
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [hr, setHr] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [sec, setSec] = useState<number>(0)

    async function onAdd() {
        console.log({ name, endDate, description, imageURL, hr, min, sec })
        onOpenChange(false)
    }

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
