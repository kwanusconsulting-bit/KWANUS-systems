import { partnerEngine } from '@/lib/partner/engine';

describe('Partner Engine', () => {
    test('processInteraction updates alignment', () => {
        const initialAlignment = partnerEngine.getAlignment();
        partnerEngine.processInteraction({ type: 'positive' });
        expect(partnerEngine.getAlignment()).toBeGreaterThan(initialAlignment);
    });
});
