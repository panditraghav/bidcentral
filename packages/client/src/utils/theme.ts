import { ThemeMode } from "./types";

type Callback = (mode: ThemeMode) => void;
type CallbackId = number;
type EventType = 'toggle'
type CallbackWithType = { type: EventType, callback: Callback }

const THEME_KEY = 'theme'

export class ThemeManager {
    themeMode: ThemeMode
    callbacks: Map<CallbackId, CallbackWithType>
    cbId: CallbackId = 0

    constructor() {
        this.themeMode = 'dark'
        this.callbacks = new Map<CallbackId, CallbackWithType>
    }

    setCurrentThemeMode(mode: ThemeMode) {
        this.themeMode = mode;
        this.callCallbacksOfType('toggle')
    }

    callCallbacksOfType(type: EventType) {
        this.callbacks.forEach((value) => {
            if (value.type === type) {
                value.callback(this.themeMode)
            }
        })
    }

    toggleMode() {
        this.themeMode = this.themeMode === 'dark' ? 'light' : 'dark'
        this.callCallbacksOfType('toggle')
    }

    on(type: EventType, callback: Callback) {
        const newCbId = this.cbId++
        this.callbacks.set(newCbId, { type, callback })
        return () => {
            this.callbacks.delete(newCbId)
        }
    }

}
export function setThemeClassToBody(theme: ThemeMode) {
    const html = document.documentElement
    const cl = html.classList
    if (theme == 'dark' && !cl.contains(theme)) {
        cl.add(theme)
    }
    if (theme === 'light') {
        cl.remove('dark')
    }
}

export function setLocalTheme(theme: ThemeMode) {
    localStorage.setItem(THEME_KEY, theme)
}

export function getLocalTheme(): ThemeMode {
    const localTheme = localStorage.getItem(THEME_KEY)
    if (localTheme === 'dark' || localTheme === 'light') return localTheme;
    return 'dark'
}

export const themeManager = new ThemeManager()
