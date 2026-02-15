import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * KWANUS UI Utility: cn
 * Merges Tailwind classes safely with clsx.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
