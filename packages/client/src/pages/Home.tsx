import { Container, Grid, } from "@mui/material";
import ItemCard from "../components/ItemCard";
import { items } from '../utils/testData'


export default function Home() {
    return (
        <Container sx={{ my: 2 }} maxWidth="md">
            <Grid container spacing={4}>
                {items.map((item) => (
                    <ItemCard item={item} key={item.id} />
                ))}
                {items.map((item) => (
                    <ItemCard item={item} key={item.id} />
                ))}
                {items.map((item) => (
                    <ItemCard item={item} key={item.id} />
                ))}
            </Grid>
        </Container>
    );
}
