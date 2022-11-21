import DocumentStore from "./store";
import Document from "../document";
import {
    generateHashKey
} from "../keygen";
import * as fs from "fs";
import * as fsPromises from "fs/promises";

export default class FileDocumentStore implements DocumentStore {
    private readonly directory: string;

    constructor(directory: string = "data") {
        this.directory = directory;
        // create the directory if it doesn't exist
        fsPromises.mkdir(this.directory, {
            recursive: true
        });
    }

    private getFilePath(key: string): string {
        return `${this.directory}/${key}.json`;
    }

    private chooseKey(key: string): string {
        // check if the key exists
        if (fs.existsSync(this.getFilePath(key))) {
            // if it does, generate a new key and try again
            return this.chooseKey(generateHashKey(key.length));
        } else return key;
    }

    public async create(keyLength: number, document: Document): Promise<string> {
        // generate a random key
        const key = this.chooseKey(generateHashKey(keyLength));
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
