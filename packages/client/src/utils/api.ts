import { AllItemResponse, ItemType } from ".";
import { SERVER_URL } from "./url";

export async function getItemsBySlug({ slug }: { slug?: string }) {
    if (!slug) return null;
    const { doc: data } = await fetch(`${SERVER_URL}/api/assets/${slug}`).then(res => res.json()) as { doc: ItemType }
    return data;
}

export async function getAllItems() {
    const data = await fetch(`${SERVER_URL}/api/assets`).then(res => res.json()) as AllItemResponse
    return data
}
