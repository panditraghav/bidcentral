import { useEffect, useState } from "react";

export type CountDown = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export function getCountdown(endDate: Date): CountDown {
    const endDateTime = endDate.getTime()
    const now = Date.now()

    if (endDateTime < now) return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }

    const dist = endDateTime - now
    const msInDay = 1000 * 60 * 60 * 24
    const msInHour = 1000 * 60 * 60
    const msInMinute = 1000 * 60
    const msInSecond = 1000

    return {
        days: Math.floor(dist / msInDay),
        hours: Math.floor((dist % msInDay) / msInHour),
        minutes: Math.floor((dist % msInHour) / msInMinute),
        seconds: Math.floor((dist % msInMinute) / msInSecond)
    }
}


export function useCountdown(endDate: Date) {
    const [countDown, setCountDown] = useState<CountDown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    function tick() {
        setCountDown(getCountdown(endDate))
    }

    useEffect(() => {
        const interval = setInterval(tick, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [endDate])
    return countDown
}
