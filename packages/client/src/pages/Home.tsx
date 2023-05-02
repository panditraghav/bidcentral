import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Home() {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    return (
        <main>
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
                                    image="https://source.unsplash.com/random"
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
        </main>
    );
}
