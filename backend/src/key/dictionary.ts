import * as fs from "fs";
import KeyGenerator from "$key";

export type DictionaryOptions = {
    path: string;
}

export default class DictionaryKeyGenerator implements KeyGenerator {
    private words: string[] = [];

    constructor(options: DictionaryOptions) {
        if (!options.path) throw new Error("No dictionary path provided");
        if (!fs.existsSync(options.path)) throw new Error("Dictionary file does not exist");

        fs.readFile(options.path, "utf-8", (err, data) => {
            if (err) throw err;

            this.words = data.split(/[\n\r]+/);
        });
    }

    public generateKey(length: number): string {
        let key = "";

        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * this.words.length);
            key += this.words[index];
        }

        return key;
    }
}
