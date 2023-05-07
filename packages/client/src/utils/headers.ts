import { getJWT } from ".";

export function getAuthHeaders(): { [key: string]: any } {
    const jwt = getJWT()
    if (jwt) {
        return {
            'Authorization': `Bearer ${jwt}`
        }
    }
    return {}
}
