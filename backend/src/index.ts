// move to the "run" directory
import path from "path";
import * as fs from "fs";

const runDir = path.join(__dirname, '../run');
const runDirExists = fs.existsSync(runDir);
if (!runDirExists) {
    fs.mkdirSync(runDir);
}

process.chdir(runDir);

// setup dotenv
require("dotenv").config();

// import the application internals
import express from "express";
import cors from "cors";
import DocumentHandler from "./handler";

// setup the application
const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const handler = new DocumentHandler(process.env.KEY_LENGTH ? parseInt(process.env.KEY_LENGTH) : DocumentHandler.DEFAULT_KEY_LENGTH);

// setup the middleware
app.use(cors());
app.use(express.json());

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

app.post("/documents", async (req, res) => {
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

app.listen(port, host, () => console.log(`Server is running on port ${port}.`));
