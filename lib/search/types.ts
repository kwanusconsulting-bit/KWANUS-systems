export type SearchDomain = 'page' | 'partner' | 'item' | 'insight';

export interface SearchResult {
    id: string;
    type: SearchDomain;
    label: string;
    href: string;
    score: number;
    metadata?: Record<string, any>;
}
