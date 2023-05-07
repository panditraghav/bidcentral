const JWT_LOCALSTORAGE_KEY = 'token'

export function setJWT(jwt: string) {
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, jwt)
}


export function getJWT(): string | null {
    return localStorage.getItem(JWT_LOCALSTORAGE_KEY)
}

