import { cn } from "@/utils";
import { Input } from "./ui/Input";
import { useEffect, useState } from "react";
import { Label } from "./ui/Label";

export default function TimePicker({
    onChange,
    className
}: {
    onChange: (hr: number, min: number, sec: number) => void;
    className?: string;
}) {
    const hr = useTimeInput()
    const min = useTimeInput()
    const sec = useTimeInput()

    useEffect(() => {
        onChange(hr.value, min.value, sec.value)
    }, [hr, min, sec])

    return (
        <div className={cn("grid grid-cols-3 space-x-3", className)}>
            <div>
                <Label htmlFor="hr" className="text-muted-foreground">Hours</Label>
                <Input
                    id="hr"
                    max={24}
                    {...hr}
                />
            </div>
            <div>
                <Label htmlFor="min" className="text-muted-foreground">Minutes</Label>
                <Input
                    id="min"
                    placeholder="min"
                    max={60}
                    {...min}
                />
            </div>
            <div>
                <Label htmlFor="min" className="text-muted-foreground">Seconds</Label>
                <Input
                    placeholder="sec"
                    max={60}
                    {...sec}
                />
            </div>
        </div>
    )
}

function useTimeInput() {
    const [time, setTime] = useState<number>(0)
    return {
        value: time,
        type: "number",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            const newHr = e.target.valueAsNumber
            const max = parseInt(e.target.max)
            if (!newHr) {
                setTime(0)
                return
            }
            if (newHr > max) {
                setTime(max)
            } else {
                setTime(newHr)
            }
        }
    }
}
