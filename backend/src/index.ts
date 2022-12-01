// move to the "run" directory
import path from "path";
import * as fs from "fs";

const runDir = path.join(__dirname, '../run');
const runDirExists = fs.existsSync(runDir);
if (!runDirExists) {
    fs.mkdirSync(runDir);
}

process.chdir(runDir);

// Read config
import config from "./config";

// Import internal dependencies/modules
import express from "express";
import cors from "cors";
import DocumentHandler from "./handler";

// Setup the application instances
const app = express();
const handler = new DocumentHandler(
    config.keyLength,
    () => {
        const keyGenerator = require(`./key/${config.keyGenerator.type}`).default;
        const keyGenInstance = new keyGenerator(config.keyGenerator.options);

        const store = require(`./stores/${config.store.type}`).default;
        return new store({
            ...config.store.options,
            keyGenerator: keyGenInstance
        });
    }
);

// Setup Express the middleware
app.use(cors());
app.use(express.raw());
app.use(express.json());

// Setup Express the routes
app.get("/documents/:key", async (req, res) => {
    const key = req.params.key;
    const document = await handler.get(key);
    if (document) {
        res.json({
            "title": document.title,
            "language": document.language,
            "content": document.content
        });
    } else {
        res.status(404).json({
            "error": "Document not found"
        });
    }
});

app.post("/new", async (req, res) => {
    const document = req.body;

    if (!document.content) {
        res.status(400).json({
            "error": "Document content is required"
        });

        return;
    }

    const key = await handler.create(document);
    res.status(201).json({
        "key": key
    });
});

// Start the application / Listen for requests
app.listen(config.port, config.host, () => console.log(`Server is now listening on port ${config.port}.`));
