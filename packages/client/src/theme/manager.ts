import { PaletteMode } from "@mui/material";

type Callback = (mode: PaletteMode) => void;
type CallbackId = number;
type EventType = 'toggle'
type CallbackWithType = { type: EventType, callback: Callback }

export class PaletteModeManager {
    paletteMode: PaletteMode
    callbacks: Map<CallbackId, CallbackWithType>
    cbId: CallbackId = 0

    constructor() {
        this.paletteMode = 'dark'
        this.callbacks = new Map<CallbackId, CallbackWithType>
    }

    setCurrentMode(mode: PaletteMode) {
        this.paletteMode = mode;
    }

    callCallbacksOfType(type: EventType) {
        this.callbacks.forEach((value) => {
            if (value.type === type) {
                value.callback(this.paletteMode)
            }
        })
    }

    toggleMode() {
        this.paletteMode = this.paletteMode === 'dark' ? 'light' : 'dark'
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

export const paletteModeManager = new PaletteModeManager()
