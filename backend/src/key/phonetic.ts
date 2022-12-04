import KeyGenerator from "$key";

export default class PhoneticKeyGenerator implements KeyGenerator {
    private readonly vowels: string = "aeiouy";
    private readonly consonants: string = "bcdfghjklmnpqrstvwxz";

    private generateVowel(): string {
        return this.vowels[Math.floor(Math.random() * this.vowels.length)];
    }

    private generateConsonant(): string {
        return this.consonants[Math.floor(Math.random() * this.consonants.length)];
    }

    public generateKey(length: number): string {
        let key = "";

        for (let i = 0; i < length; i++) {
            if (i % 2 === 0) key += this.generateConsonant();
            else key += this.generateVowel();
        }

        return key;
    }
}
