import { calculateHarmonicAlignment } from './harmonics';
import { eventRouter } from '../events/router';

/**
 * KWANUS Partner Engine (Relational Intelligence)
 * Governing harmonics and partner interactions.
 */

class PartnerEngine {
    private alignment: number = 0.5;

    getAlignment() {
        return this.alignment;
    }

    processInteraction(interaction: any) {
        const newAlignment = calculateHarmonicAlignment(this.alignment, interaction);

        if (newAlignment !== this.alignment) {
            this.alignment = newAlignment;
            console.log(`[PARTNER_ENGINE] Alignment Shift: ${newAlignment.toFixed(2)}`);

            eventRouter.emit({
                id: `rel-${Date.now()}`,
                type: 'INTENSITY_SHIFT', // Shared with global intensity
                domain: 'partner',
                userId: 'system',
                payload: { alignment: newAlignment },
                createdAt: new Date().toISOString()
            });
        }
    }
}

export const partnerEngine = new PartnerEngine();
