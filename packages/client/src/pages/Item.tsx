import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { ItemType } from "@/utils";
import { getItemsBySlug } from "@/utils/api";
import { getAuthHeaders } from "@/utils/headers";
import { SERVER_URL } from "@/utils/url";
import { motion } from "framer-motion";
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ItemPage() {
    const [highestBid, setHighestBid] = useState<number>(0)
    const [newBid, setNewBid] = useState<number>(0)
    const [item, setItem] = useState<ItemType | null>(null)
    const { id: slug } = useParams()
    useEffect(() => {
        async function getAndSetItem() {
            const item = await getItemsBySlug({ slug })
            console.log(item)
            setItem(item)
            if (item) {
                setHighestBid(item.price)
            }
        }
        getAndSetItem()
    }, [])

    useEffect(() => {
        if (highestBid) {
            setNewBid(Math.round(highestBid + highestBid / 3))
        }
    }, [highestBid])

    if (!item) {
        return <Container>Not found..</Container>
    }

    async function bid() {
        try {
            const res = await fetch(`${SERVER_URL}/bid`, {
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
                toast('Bid successful', { type: 'success' })
                setHighestBid(newBid)
            } else {
                toast('Some error occured!', { type: 'error' })
            }
        } catch (error) {
            toast('Some error occured!', { type: 'error' })
        }
    }

    return (
        <Container>
            <img src={item.image} alt={item.name} />
            <div className="my-4">
                <h1 className="text-3xl font-medium">{item.name}</h1>
                <p>{item.description}</p>
                <div className="flex justify-between items-center">
                    <div className="basis-2/3">
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
                    <div className="my-4 flex items-center">
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
        </Container >
    )
}
