import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemType } from '../utils/types';
import { useCountdown } from '../hooks/countdown';


export default function ItemCard({ item }: { item: ItemType }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const countDown = useCountdown(item.endDate)

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        pt: isImageLoaded ? '0' : '56.25%',
                    }}
                    onLoad={() => setIsImageLoaded(true)}
                    image={item.image}
                    alt="Random image from unsplash"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                    </Typography>
                    <Typography>
                        {item.description}
                    </Typography>
                    <Typography color="primary" sx={{ mt: 1 }}>
                        Latest bid:- {item.currentPrice / 100} Rs.
                    </Typography>
                    <Typography color="secondary" sx={{ mt: 1 }}>
                        Time Remaining:- {countDown.hours} hours, {countDown.minutes} minutes, {countDown.seconds} seconds
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button size="small" variant='outlined'><Link to={`/item/${item.id}`}>View</Link></Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
