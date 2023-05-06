const JWT_LOCALSTORAGE_KEY = 'token'

export function setJWT(jwt: string) {
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, jwt)
}


export function getJWT(): string | null {
    return localStorage.getItem(JWT_LOCALSTORAGE_KEY)
}

export function getLocalTheme(): 'dark' | 'light' {
    const theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') {
        return theme;
    }
    return 'dark'
}

export function setLocalTheme(theme: 'dark' | 'light') {
    localStorage.setItem('theme', theme)
}
