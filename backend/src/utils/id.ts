export function generateId() {
    const epoch = Date.now();
    const seqNum = Math.floor(Math.random() * 1000);
    const id = BigInt(epoch) << BigInt(22) | BigInt(seqNum);
    return id.toString();
}
