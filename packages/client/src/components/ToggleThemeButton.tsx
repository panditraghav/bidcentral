import { themeManager } from '@/utils';
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/theme';

export default function ToggleThemeButton() {
    const theme = useTheme()

    return (
        <button onClick={() => themeManager.toggleMode()}>
            {
                theme === 'dark' ? <Sun /> : <Moon />
            }
        </button>
    )
}
