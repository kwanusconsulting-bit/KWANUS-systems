import { EmotionalMode } from './state';

export type EmotionalEventType =
    | 'RESONANCE_SHIFT'
    | 'PULSE_UPDATE'
    | 'CEREMONY_COMPLETE'
    | 'HARMONY_BREACH';

export interface EmotionalEvent {
    id: string;
    type: EmotionalEventType;
    mode: EmotionalMode;
    intensity: number;
    timestamp: string;
}
