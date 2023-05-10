import { items } from ".";
export async function getAllItems() {
    return items
}

export async function getItemsById({ id }: { id: string }) {
    return items.find((i) => i.id === id)
}
