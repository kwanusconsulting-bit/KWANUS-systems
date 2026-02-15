// IE-1: Dimensional Expansion
// Represents a new axis of emotional experience beyond simple 2D Intensity/Valence.

export interface Dimension {
    id: string;
    name: string;
    description: string;
    polarity: [string, string]; // e.g. ["Hollow", "Full"] or ["Stagnant", "Flowing"]
}

export class DimensionService {
    private static registry: Dimension[] = [
        { id: "DEPTH", name: "Depth", description: "The verticality of experience.", polarity: ["Surface", "Abyssal"] },
        { id: "TEXTURE", name: "Texture", description: "The complexity of the feeling.", polarity: ["Smooth", "Gritty"] },
        { id: "velocity", name: "Velocity", description: "The speed of internal time.", polarity: ["Static", "Rapid"] }
    ];

    static getDimensions() {
        return this.registry;
    }

    static registerDimension(dim: Dimension) {
        this.registry.push(dim);
        console.log(`[IE-1] New Dimension Registered: ${dim.name}`);
    }
}
