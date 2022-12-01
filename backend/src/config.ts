// read dotenv
require("dotenv").config();

// import fs
import * as fs from "fs";

enum AuthType {
    Default = "default",
    Discord = "discord"
}

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
    authentication: {
        types: AuthType[];
        discord: {
            clientId: string;
            clientSecret: string;
            redirectUri: string;
        };
    }
};

const defaultConfig: Config = {
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT || "3001"),
    keyLength: parseInt(process.env.KEY_LENGTH || "10"),
    keyGenerator: {
        type: process.env.KEY_GENERATOR_TYPE || "phonetic",
        options: {}
    },
    store: {
        type: process.env.STORE_TYPE || "file",
        options: {}
    },
    authentication: {
        types: process.env.AUTHENTICATION_TYPES?.split(",")?.map((type) => type as AuthType) || [AuthType.Default],
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID || "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
            redirectUri: process.env.DISCORD_REDIRECT_URI || ""
        }
    }
};

function initializeConfig(): Config {
    // get the config file path
    const configPath = process.env.CONFIG_PATH || "config.json";

    // check if the config file exists
    if (fs.existsSync(configPath)) {
        // Parse the config file
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8")) as Config;

        // Fallback to default config for missing values, otherwise use the content of the ocnfig file
        return {
            ...defaultConfig,
            ...config
        };
    } else {
        // Write the default config, since it doesn't exist, then return the default config
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 4), "utf-8");
        return defaultConfig;
    }
}

export default initializeConfig();
