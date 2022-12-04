import path from "path";
import * as fs from "fs";

export default function setupDir() {
    const runDir = path.join(__dirname, "../../run");
    const runDirExists = fs.existsSync(runDir);
    if (!runDirExists) {
        fs.mkdirSync(runDir);
    }

    process.chdir(runDir);
}
