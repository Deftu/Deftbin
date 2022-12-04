import {
    Document as DocumentSchema,
    DocumentItem,
    UserItem
} from "$db/schemas";
import KeyGenerator from "$key";
import {
    Connection
} from "mongoose";
import * as id from "$utils/id";

type DocumentCreateOptions = {
    user?: UserItem | null
}

class DocumentStore {
    constructor(
        private keyGenerator: KeyGenerator,
        private keyLength: number,
        private connection: Connection
    ) {
    }

    private async findDocument(key: string): Promise<DocumentItem | null> {
        return await DocumentSchema.findOne({
            key: key
        });
    }

    async create(document: DocumentItem): Promise<string> {
        let key = this.keyGenerator.generateKey(this.keyLength);
        while (await this.findDocument(key)) {
            key = this.keyGenerator.generateKey(this.keyLength);
        }

        document.key = key;
        document.createdAt = new Date();
        await DocumentSchema.create(document);

        return key;
    }

    async get(key: string): Promise<DocumentItem | null> {
        return await this.findDocument(key);
    }

    async delete(key: string): Promise<boolean> {
        const document = await this.findDocument(key);
        if (!document) return false;

        await DocumentSchema.deleteOne({
            key: key
        }).exec();

        return true;
    }

    async update(key: string, document: DocumentItem): Promise<boolean> {
        const existingDocument = await this.findDocument(key);
        if (!existingDocument) return false;

        const edits = [
            {
                id: id.generateId(),
                content: existingDocument.content,
                timestamp: new Date()
            }, ...(document.edits || [])
        ];

        const existingObject = {
            key: key,
            name: existingDocument.name,
            language: existingDocument.language,
            content: existingDocument.content,
            owner: existingDocument.owner,
            createdAt: existingDocument.createdAt,
            removal: existingDocument.removal,
            edits: edits
        };

        await DocumentSchema.updateOne({
            key: key
        }, {
            $set: {
                ...existingObject,
                ...document,
                edits
            }
        }, {
            upsert: true,
            new: true
        }).exec();

        return true;
    }
}

export default class DocumentHandler {
    private readonly store: DocumentStore;

    constructor(
        keyGenerator: KeyGenerator,
        keyLength: number,
        connection: Connection
    ) {
        this.store = new DocumentStore(
            keyGenerator,
            keyLength,
            connection
        );
    }

    public async create(document: DocumentItem): Promise<string> {
        return this.store.create(document);
    }

    public async get(key: string): Promise<DocumentItem | null> {
        return this.store.get(key);
    }

    public async delete(key: string): Promise<boolean> {
        return this.store.delete(key);
    }

    public async update(key: string, document: DocumentItem): Promise<boolean> {
        return this.store.update(key, document);
    }
}
