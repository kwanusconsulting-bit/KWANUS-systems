import { eventRouter } from '../../lib/events/router';

describe('KWANUS OS: Cross-Domain Resonance', () => {
    test('Event Propagation: Emotional to Global Harmony', () => {
        const globalSpy = jest.fn();
        eventRouter.on('*', globalSpy);

        eventRouter.emit({
            id: 'sync-1',
            type: 'INTENSITY_SHIFT', // Aligned with EventType
            domain: 'system',
            userId: 'steward-root',
            payload: { harmony: 0.95 },
            createdAt: new Date().toISOString()
        });

        expect(globalSpy).toHaveBeenCalled();
        expect(globalSpy.mock.calls[0][0].payload.harmony).toBe(0.95);
    });
});
