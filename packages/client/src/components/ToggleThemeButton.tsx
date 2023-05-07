import { useTheme } from '@emotion/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from "@mui/material";
import { paletteModeManager } from "../theme/manager";

export default function ToggleThemeButton() {
    const theme = useTheme()
    return (

        <IconButton onClick={() => paletteModeManager.toggleMode()}>
            {
                //@ts-ignore
                theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />
            }
        </IconButton>
    )
}
