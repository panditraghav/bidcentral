export type ItemType = {
    _id: string,
    name: string;
    slug: string;
    image: string;
    description: string;
    price: number;
    bidOpendAt: string;
    bidClosedAt: string;
    currentBid: number;
    bids: Bid[];
}

export type AllItemResponse = {
    status: string;
    result: number;
    docs: ItemType[];
}

export type ThemeMode = 'dark' | 'light'

export type Bid = {
    user: string;
    _id: string;
    amount: number;
}
