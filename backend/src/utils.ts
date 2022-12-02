export function generateUserId() {
    const epoch = Date.now();
    const seqNum = Math.floor(Math.random() * 1000);
    const snowflake = BigInt(epoch) << BigInt(22) | BigInt(seqNum);
    return snowflake.toString();
}
