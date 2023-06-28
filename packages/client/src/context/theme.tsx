import { ThemeMode, getLocalTheme, setLocalTheme, setThemeClassToBody, themeManager } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";

export const ThemeModeContext = createContext<ThemeMode>('dark')

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>(themeManager.themeMode)

    useEffect(() => {
        const localTheme = getLocalTheme()

        themeManager.setCurrentThemeMode(localTheme)
        setThemeClassToBody(localTheme)
        setMode(localTheme)

        return themeManager.on('toggle', (newMode) => {
            setMode(newMode)
            setLocalTheme(newMode)
            setThemeClassToBody(newMode)
        })
    })
    return (
        <ThemeModeContext.Provider value={mode}>
            {children}
        </ThemeModeContext.Provider>
    )
}

export function useTheme(): ThemeMode {
    return useContext(ThemeModeContext)
}
