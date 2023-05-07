import { ThemeMode } from "@/utils";
import { createContext, useContext } from "react";

export const ThemeModeContext = createContext<ThemeMode>('dark')

export function ThemeProvider({ children, value }: { children: React.ReactNode, value: ThemeMode }) {
    return (
        <ThemeModeContext.Provider value={value}>
            {children}
        </ThemeModeContext.Provider>
    )
}

export function useTheme(): ThemeMode {
    return useContext(ThemeModeContext)
}
