import Document from "./document";
import KeyGenerator from "./keygen";

export type DocumentStoreOptions = {
    keyGenerator: KeyGenerator;
}

export default interface DocumentStore {
    create(keyLength: number, document: Document): Promise<string>;
    get(key: string): Promise<Document | null>;
}
