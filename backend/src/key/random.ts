import KeyGenerator from "$key";

export type RandomOptions = {
    characters: string;
}

export default class RandomKeyGenerator implements KeyGenerator {
    private characters: string;

    constructor(options: RandomOptions) {
        if (!options.characters) throw new Error("No characters provided");

        this.characters = options.characters || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }

    public generateKey(length: number): string {
        let key = "";

        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * this.characters.length);
            key += this.characters[index];
        }

        return key;
    }
}
