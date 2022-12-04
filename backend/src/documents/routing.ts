import config from "$config";
import DocumentHandler from "$documents/handler";
import documentConnection from "$db/document";
import {
    Router
} from "express";

const keyGenerator = require(`../key/${config.keyGenerator.type}`).default;
const keyGenInstance = new keyGenerator(config.keyGenerator.options);
const documentHandler = new DocumentHandler(
    keyGenInstance,
    config.keyLength,
    documentConnection
);

const documentRouter = Router();

documentRouter.get("/key/:key", async (req, res) => {
    const key = req.params.key;
    const document = await documentHandler.get(key);
    if (!document) {
        res.status(404).json({
            "error": "Document not found"
        });
    } else res.json({
        "key": document.key,
        "name": document.name,
        "language": document.language,
        "content": document.content,
        "owner": document.owner,
        "createdAt": document.createdAt,
        "removal": document.removal,
        "edits": document.edits
    });
});

documentRouter.post("/new", async (req, res) => {
    const document = req.body;
    if (!document.content) {
        res.status(400).json({
            "error": "Document content is required"
        });

        return;
    }

    const key = await documentHandler.create(document, {
        user: req.user
    });
    res.status(201).json({
        "key": key
    });
});

documentRouter.delete("/delete/:key", async (req, res) => {
    const key = req.params.key;
    const document = await documentHandler.get(key);
    if (document) {
        // check auth
        if (req.user) {
            // check if the user is the owner or if the user is an admin or moderator
            if (req.user["id"] !== document.owner && req.user["role"] == "moderation" && req.user["role"] == "admin") {
                res.status(403).json({
                    "error": "You do not have permission to delete this document"
                });

                return;
            }

            await documentHandler.delete(key);
            res.status(204).send();
        } else res.status(401).json({
            "error": "Unauthorized"
        });
    } else res.status(404).json({
        "error": "Document not found"
    });
});

documentRouter.put("/edit/:key", async (req, res) => {
    const key = req.params.key;
    const document = await documentHandler.get(key);
    if (document) {
        // check auth
        if (req.user) {
            // check if the user is the owner or if the user is an admin or moderator
            if (req.user["id"] !== document.owner && req.user["role"] == "moderation" && req.user["role"] == "admin") {
                res.status(403).json({
                    "error": "You do not have permission to edit this document"
                });

                return;
            }

            const edit = req.body;
            if (!edit.content) {
                res.status(400).json({
                    "error": "Document content is required"
                });

                return;
            }

            await documentHandler.update(key, edit, {
                user: req.user
            });
            res.status(204).send();
        } else res.status(401).json({
            "error": "Unauthorized"
        });
    } else res.status(404).json({
        "error": "Document not found"
    });
});

export default documentRouter;
