import { eventRouter } from '../../lib/events/router';

describe('KWANUS OS: Thinking Loop Integrity', () => {
    test('Event Propagation: Emotional Intensity Shift', () => {
        const mockCallback = jest.fn();
        eventRouter.on('INTENSITY_SHIFT', mockCallback);

        const testEvent = {
            id: 'test-1',
            type: 'INTENSITY_SHIFT' as const,
            domain: 'emotional' as const,
            userId: 'steward-root',
            payload: { mode: 'thriving', intensity: 0.99 },
            createdAt: new Date().toISOString()
        };

        eventRouter.emit(testEvent);
        expect(mockCallback).toHaveBeenCalledWith(testEvent);
    });

    test('Event Routing: Domain-Specific Integrity', () => {
        const emotionalCallback = jest.fn();
        const hybridCallback = jest.fn();

        eventRouter.on('CHECK_IN', emotionalCallback);
        eventRouter.on('HYBRID_UPDATE', hybridCallback);

        eventRouter.emit({
            id: 'e-1',
            type: 'CHECK_IN',
            domain: 'emotional',
            userId: 'u1',
            payload: { tone: 'calm' },
            createdAt: new Date().toISOString()
        });

        expect(emotionalCallback).toHaveBeenCalled();
        expect(hybridCallback).not.toHaveBeenCalled();
    });
});
