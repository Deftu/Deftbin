import DocumentStore from "./store";
import Document from "./document";

export default class DocumentHandler {
    public static readonly DEFAULT_KEY_LENGTH = "10";
    public readonly store: DocumentStore;

    constructor(
        public keyLength: number,
        store: () => DocumentStore,
    ) {
        this.store = store();
    }

    public async create(document: Document): Promise<string> {
        return this.store.create(this.keyLength, document);
    }

    public async get(key: string): Promise<Document | null> {
        return this.store.get(key);
    }
}
