// import fs
import * as fs from "fs";

type Config = {
    host: string;
    port: number;
    keyLength: number;
    keyGenerator: {
        type: string;
        options: any;
    };
    store: {
        type: string;
        options: any;
    };
};

// read dotenv
require("dotenv").config();

function initializeConfig() {
    // get the config file path
    const configPath = process.env.CONFIG_PATH || "config.json";

    // check if the config file exists
    if (fs.existsSync(configPath)) {
        // read the config file
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8")) as Config;

        // return the config
        return config;
    }
}

export default initializeConfig();
