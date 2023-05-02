import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const images = [
    'https://plus.unsplash.com/premium_photo-1681666713728-9ed75e148617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    'https://images.unsplash.com/photo-1587134160474-cd3c9a60a34a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
]

export default function Home() {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    return (
        <Container sx={{ my: 2 }} maxWidth="md">
            <Grid container spacing={4}>
                {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    pt: isImageLoaded ? '0' : '56.25%',
                                }}
                                onLoad={() => setIsImageLoaded(true)}
                                image={images[Math.floor(Math.random() * images.length)]}
                                alt="Random image from unsplash"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Heading
                                </Typography>
                                <Typography>
                                    This is a media card. You can use this section to describe the
                                    content.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
