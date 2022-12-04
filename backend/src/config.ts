// read dotenv
require("dotenv").config();

// import fs
import * as fs from "fs";

export enum AuthType {
    Discord = "discord",
    GitHub = "github"
}

type Config = {
    host: string;
    port: number;
    frontend: {
        host: string;
        port: string;
    };
    database: {
        host: string;
        port: number;
    };
    keyLength: number;
    keyGenerator: {
        type: string;
        options: any;
    };
    authentication: {
        types: AuthType[];
        sessionSecret: string;
        discord: {
            clientId: string;
            clientSecret: string;
            redirectUri: string;
        };
        github: {
            clientId: string;
            clientSecret: string;
            redirectUri: string;
        }
    }
};

const defaultConfig: Config = {
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT || "3001"),
    frontend: {
        host: process.env.FRONTEND_HOST || "",
        port: process.env.FRONTEND_PORT || ""
    },
    database: {
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT || "5432")
    },
    keyLength: parseInt(process.env.KEY_LENGTH || "10"),
    keyGenerator: {
        type: process.env.KEY_GENERATOR_TYPE || "phonetic",
        options: {}
    },
    authentication: {
        types: process.env.AUTHENTICATION_TYPES?.split(",")?.map((type) => type as AuthType) || [],
        sessionSecret: process.env.SESSSION_SECRET || "",
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID || "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
            redirectUri: process.env.DISCORD_REDIRECT_URI || ""
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
            redirectUri: process.env.GITHUB_REDIRECT_URI || ""
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

        // Fallback to default config for missing values, including nested objects, otherwise use the config file value
        return {
            ...defaultConfig,
            ...config,
            frontend: {
                ...defaultConfig.frontend,
                ...config.frontend
            },
            database: {
                ...defaultConfig.database,
                ...config.database
            },
            keyGenerator: {
                ...defaultConfig.keyGenerator,
                ...config.keyGenerator
            },
            authentication: {
                ...defaultConfig.authentication,
                ...config.authentication
            }
        };
    } else {
        // Write the default config, since it doesn't exist, then return the default config
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 4), "utf-8");
        return defaultConfig;
    }
}

const config = initializeConfig();
export default config;
