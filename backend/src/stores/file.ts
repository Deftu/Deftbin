import DocumentStore, {
    DocumentStoreOptions
} from "../store";
import KeyGenerator from "../keygen";
import Document from "../document";
import * as fs from "fs";
import * as fsPromises from "fs/promises";

export type FileStoreOptions = {
    path: string;
} & DocumentStoreOptions;

export default class FileDocumentStore implements DocumentStore {
    private readonly keyGenerator: KeyGenerator;
    private readonly directory: string;

    constructor(options: FileStoreOptions) {
        // check if the path is provided
        if (!options.path) throw new Error("No path provided");

        // check if the path exists
        fsPromises.mkdir(options.path, {
            recursive: true
        });

        // setup
        this.keyGenerator = options.keyGenerator;
        this.directory = options.path;
    }

    private getFilePath(key: string): string {
        return `${this.directory}/${key}.json`;
    }

    private chooseKey(key: string): string {
        // check if the key exists
        if (fs.existsSync(this.getFilePath(key))) {
            // if it does, generate a new key and try again
            return this.chooseKey(this.keyGenerator.generateKey(key.length));
        } else return key;
    }

    public async create(keyLength: number, document: Document): Promise<string> {
        // generate a random key
        const key = this.chooseKey(this.keyGenerator.generateKey(keyLength));
        // write the document to the file system
        await fsPromises.writeFile(this.getFilePath(key), JSON.stringify(document, null, 4));
        // return the key
        return key;
    }

    public async get(key: string): Promise<Document | null> {
        // get the file path
        const filePath = this.getFilePath(key);

        // check if the file exists
        if (fs.existsSync(filePath)) {
            // read the file
            const file = await fsPromises.readFile(filePath);
            // parse the JSON
            const document = JSON.parse(file.toString()) as Document;
            // return the document
            return document;
        } else return null;
    }
}
