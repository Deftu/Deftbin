import crypto from "crypto";

export function generateHashKey(length: number): string {
    return crypto.randomBytes(length).toString("hex");
}
