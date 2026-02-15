export type InsightDomain = 'emotional' | 'hybrid' | 'partner' | 'productivity' | 'system';
export type InsightType = 'trend' | 'recommendation' | 'alert' | 'prediction';

export interface Insight {
    id: string;
    domain: InsightDomain;
    type: InsightType;
    message: string;
    intensity: number;
    createdAt: string;
}
