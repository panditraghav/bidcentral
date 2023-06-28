import Container from "../Container";
import CardSkeleton from "./CardSkeleton";

export default function HomePageSkeleton() {
    return (
        <Container className="my-8">
            <div className="flex space-y-3 flex-wrap justify-center">
                {new Array(9).fill(0, 0, 9).map((_, index) => {
                    return <CardSkeleton key={index} />
                })}
            </div>
        </Container >
    )
}
