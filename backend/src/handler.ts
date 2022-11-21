import DocumentStore from "./stores/store";
import FileDocumentStore from "./stores/file";
import Document from "./document";

export default class DocumentHandler {
    public static readonly DEFAULT_KEY_LENGTH = 5;

    constructor(
        public keyLength: number,
        public store: DocumentStore = new FileDocumentStore(),
    ) {
    }

    public async create(document: Document): Promise<string> {
        return this.store.create(this.keyLength, document);
    }

    public async get(key: string): Promise<Document | null> {
        return this.store.get(key);
    }
}
