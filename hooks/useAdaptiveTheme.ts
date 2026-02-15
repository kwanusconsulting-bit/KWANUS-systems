import { useEffect, useState } from "react";
import { EmotionalMap } from "@/lib/cosmos/emotional-map";
import { Theme, ThemePalettes } from "@/lib/cosmos/themes";

export function useAdaptiveTheme(intensity: number | null) {
    const [theme, setTheme] = useState<Theme>(ThemePalettes["gray-beige"]);

    useEffect(() => {
        if (intensity === null) return;

        let key: keyof typeof EmotionalMap = "NEUTRAL";

        if (intensity <= 2) key = "WORST";
        else if (intensity <= 4) key = "LOW";
        else if (intensity <= 6) key = "NEUTRAL";
        else if (intensity <= 8) key = "RISING";
        else key = "THRIVING";

        const paletteKey = EmotionalMap[key] as any;
        setTheme(ThemePalettes[paletteKey as keyof typeof ThemePalettes]);
    }, [intensity]);

    return theme;
}
