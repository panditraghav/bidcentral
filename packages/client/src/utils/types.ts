export type ItemType = {
    _id: string,
    name: string;
    slug: string;
    image: string;
    description: string;
    price: number;
    bidOpenAt: Date;
    bidCloseAt: Date;
    bids: [];
}

export type AllItemResponse = {
    status: string;
    result: number;
    docs: ItemType[];
}

export type ThemeMode = 'dark' | 'light'
