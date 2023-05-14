import { cn } from "@/utils";
import { Input } from "./ui/Input";
import { useEffect, useState } from "react";

export default function TimePicker({
    onChange,
    className
}: {
    onChange: (hr: number, min: number, sec: number) => void;
    className?: string;
}) {
    const [hr, setHr] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [sec, setSec] = useState<number>(0)

    useEffect(() => {
        onChange(hr, min, sec)
    }, [hr, min, sec])

    return (
        <div className={cn("flex justify-center", className)}>
            <Input
                placeholder="hr"
                value={hr}
                onChange={
                    (e) => {
                        let newHr = e.target.valueAsNumber
                        if (newHr > 24) {
                            setHr(24)
                        } else {
                            setHr(newHr)
                        }
                    }
                }
                type="number"
                max={24}
            />
            <Input
                placeholder="min"
                type="number"
                value={min}
                onChange={
                    (e) => {
                        let newMin = e.target.valueAsNumber
                        if (newMin > 60) {
                            setMin(60)
                        } else {
                            setMin(newMin)
                        }
                    }
                }
                max={60}
            />
            <Input
                placeholder="sec"
                type="number"
                value={sec}
                onChange={
                    (e) => {
                        let newSec = e.target.valueAsNumber
                        if (newSec > 60) {
                            setSec(60)
                        } else {
                            setSec(newSec)
                        }
                    }
                }
                max={60}
            />
        </div>
    )
}
