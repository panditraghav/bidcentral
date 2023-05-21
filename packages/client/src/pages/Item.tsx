import Container from "@/components/Container";
import TopBidsTable from "@/components/TopBidsTable";
import ItemPageSkeleton from "@/components/skeleton/ItemPageSkeleton";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { Button } from "@/components/ui/Button";
import { getItemsBySlug } from "@/utils/api";
import { getAuthHeaders } from "@/utils/headers";
import { SERVER_URL } from "@/utils/url";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ItemPage() {
    const { id: slug } = useParams()
    const queryClient = useQueryClient()
    const [highestBid, setHighestBid] = useState<number>(0)
    const [newBid, setNewBid] = useState<number>(0)
    const { data: item, isLoading, isError } = useQuery([`item-${slug || ''}`], () => getItemsBySlug({ slug }))

    // 20% of item's initial price
    const nextBidAddition = (item?.price || 10000) / 5

    useEffect(() => {
        if (item) {
            if (item.bids.length > 0) {
                setHighestBid(Math.max.apply(null, item.bids.map(bid => bid.amount)))
            } else {
                setHighestBid(0)
            }
        }
    }, [item])

    useEffect(() => {
        if (highestBid) {
            setNewBid(Math.round(highestBid + nextBidAddition))
        } else {
            setNewBid(item?.price || 0)
        }
    }, [nextBidAddition, highestBid])

    if (isLoading) {
        return <ItemPageSkeleton />
    }

    if (isError) {
        return (
            <div>Item not found!</div>
        )
    }

    async function bid() {
        try {
            const res = await fetch(`${SERVER_URL}/assets/bid`, {
                method: 'post',
                body: JSON.stringify({
                    asset: item?._id,
                    amount: newBid
                }),
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                }
            })
            if (res.ok) {
                setHighestBid(newBid)
                queryClient.invalidateQueries([`item-${slug || ''}`])
            } else {
                console.log(await res.json())
                toast('Some error occured!', { type: 'error' })
            }
        } catch (error) {
            console.log(error)
            toast('Some error occured!', { type: 'error' })
        }
    }

    return (
        <Container>
            <div className="flex w-full md:flex-row flex-col">
                <div className="basis-1/2 mr-4 h-full space-y-5 md:sticky md:left-0 md:top-20">
                    <AspectRatio ratio={1.5}>
                        <img src={item?.image} alt={item?.name} className="rounded-sm w-full h-full object-cover" />
                    </AspectRatio>
                    <h1 className="text-2xl mb-4">{item?.name}</h1>
                    <div>
                        <span className="font-medium">Starting price:- </span>
                        <span>{item?.price}</span>
                    </div>
                    <p>{item?.description}</p>
                </div>
                <div className="basis-2/3 relative">
                    <h2 className="text-xl my-3">Top Bidders</h2>
                    <TopBidsTable bids={item?.bids} />
                    <div className="flex justify-between items-center absolute sticky bottom-0 right-0 w-full bg-background border-y md:mt-2 md:flex-row flex-col my-4 py-4 space-y-2">
                        <div className="basis-1/3">
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                key={highestBid}
                            >
                                <span className="font-medium">Highest bid:- </span>
                                <span>
                                    {highestBid} Rs
                                </span>
                            </motion.div>
                        </div>
                        <div className="flex items-center">
                            <Button variant="link">
                                <MinusIcon />
                            </Button>
                            <Button onClick={bid}>Bid {newBid} Rs</Button>
                            <Button variant="link">
                                <PlusIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}
