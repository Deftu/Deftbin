import Document from "../document";

export default interface DocumentStore {
    create(keyLength: number, document: Document): Promise<string>;
    get(key: string): Promise<Document | null>;
}
