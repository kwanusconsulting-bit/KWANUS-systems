export type EmotionalMode = 'worst' | 'neutral' | 'progressing' | 'thriving';

export interface EmotionalState {
    intensity: number; // 0.0 to 1.0
    mode: EmotionalMode;
    lastShift: string;
}

export interface EmotionalEvent {
    id: string;
    type: string;
    intensity: number;
    payload: Record<string, any>;
    createdAt: string;
}
