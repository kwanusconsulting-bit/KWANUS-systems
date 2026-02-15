/**
 * KWANUS Search Indexer
 * Building the internal map of the OS's knowledge.
 */

export class SearchIndexer {
    private index: Map<string, any> = new Map();

    indexDocument(id: string, content: any) {
        this.index.set(id, content);
        console.log(`[SEARCH_INDEXER] Indexed: ${id}`);
    }

    clearIndex() {
        this.index.clear();
    }
}

export const searchIndexer = new SearchIndexer();
