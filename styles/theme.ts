export type ThemeMode = 'day' | 'night';

export interface ThemeConfig {
    background: string;
    ambientLightIntensity: number;
    fogColor: string;
    primaryNodeColor: string;
    secondaryNodeColor: string;
}

export const themes: Record<ThemeMode, ThemeConfig> = {
    day: {
        background: '#EAF6FF',
        ambientLightIntensity: 1.5,
        fogColor: '#EAF6FF',
        primaryNodeColor: '#4A90E2', // Light Blue
        secondaryNodeColor: '#82C1FF',
    },
    night: {
        background: '#050B14',
        ambientLightIntensity: 0.5,
        fogColor: '#050B14',
        primaryNodeColor: '#00FFFF', // Neon Cyan
        secondaryNodeColor: '#003366', // Deep Navy
    },
};
