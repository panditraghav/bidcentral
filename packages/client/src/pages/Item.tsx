import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { items } from "../utils/testData";
import { useEffect, useState } from "react";
import { ItemType } from "../utils/types";
import { Add, Remove } from "@mui/icons-material";

//Taking money in paisa instead of rupee for precition
const BID_OFFSET = 50 * 100;

export default function Item() {
    const [newBid, setNewBid] = useState<number>(0)
    const [latestBid, setLatestBid] = useState<number>(0)
    const [requiredItem, setRequiredItem] = useState<ItemType>()

    const { id } = useParams()
    useEffect(() => {
        const reqItem = items.find(item => item.id === id)
        const initialPrice = reqItem?.currentPrice ? reqItem.currentPrice + BID_OFFSET : 0
        setRequiredItem(reqItem)
        setNewBid(initialPrice)
        setLatestBid(initialPrice)
    }, [])

    if (!requiredItem) {
        return <Container maxWidth="sm"><h1>Item with this id not found!</h1></Container>
    }
    return (
        <Container maxWidth="md" sx={{ mt: 1 }}>
            <Box>
                <img src={requiredItem.image} alt={requiredItem.name} style={{ objectFit: 'cover', width: '100%' }} />
                <Typography component={'h1'} variant="h3" sx={{ my: 2 }}>{requiredItem.name}</Typography>
                <Typography component={'p'} variant="body1" sx={{ my: 2 }}>{requiredItem.description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography component={'span'} variant="body1" sx={{ my: 2 }} color="primary">
                        Latest Bid:- {latestBid / 100} Rs
                    </Typography>
                    <Box sx={{ display: 'flex', mt: 2, mb: 3 }}>
                        <IconButton
                            sx={{ mx: 1 }}
                            onClick={() => setNewBid(oldBid => oldBid - BID_OFFSET)}
                        >
                            <Remove />
                        </IconButton>
                        <Button variant="contained" onClick={() => setLatestBid(newBid)}>Bid {newBid / 100} Rs</Button>
                        <IconButton
                            sx={{ mx: 1 }}
                            onClick={() => setNewBid(oldBid => oldBid + BID_OFFSET)}
                        >
                            <Add />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
