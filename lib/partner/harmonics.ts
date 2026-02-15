/**
 * KWANUS Partner Engine: Harmonics
 * Logic for calculating relational alignment.
 */

export function calculateHarmonicAlignment(current: number, interaction: any): number {
    let factor = 0;

    switch (interaction.type) {
        case 'POSITIVE': factor = 0.05; break;
        case 'NEGATIVE': factor = -0.10; break;
        case 'NEUTRAL': factor = 0.01; break;
        default: factor = 0;
    }

    return Math.min(Math.max(current + factor, 0), 1);
}
