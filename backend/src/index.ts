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
import config, {
    AuthType
} from "./config";

// Import internal dependencies/modules
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import store from "connect-mongo";
import "./database/database";
import DocumentHandler from "./handler";

// Setup the application instances
const app = express();
const handler = new DocumentHandler(
    config.keyLength,
    () => {
        const keyGenerator = require(`./key/${config.keyGenerator.type}`).default;
        const keyGenInstance = new keyGenerator(config.keyGenerator.options);

        const store = require(`./stores/file`).default;
        return new store({
            ...config.store.options,
            keyGenerator: keyGenInstance
        });
    }
);

// Setup Express the middleware
app.use(cors({
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: config.authentication.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60 * 24 * 7 // 1 week
    },
    store: store.create({
        mongoUrl: `mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`,
        dbName: "sessions"
    })
}));
app.use(passport.initialize());
app.use(passport.session());

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

// Set up timeout for requests made for authentication
app.use((req, res, next) => setTimeout(() => next(), 800));

// Set up authentication using a router under /auth
const router = express.Router();

// TODO - Default authentication is not implemented yet

if (config.authentication.types.includes(AuthType.Discord)) {
    const discord = require("./auth/discord").default;
    const discordAuth = new discord();
    discordAuth.setup(app, router);
}

if (config.authentication.types.includes(AuthType.GitHub)) {
    const github = require("./auth/github").default;
    const githubAuth = new github();
    githubAuth.setup(app, router);
}

router.get("/status", (req, res) => {
    if (req.user) {
        res.json({
            "authenticated": true,
            "user": req.user
        });
    } else res.json({
        "authenticated": false
    });
});

app.use("/auth", router);

// Start the application / Listen for requests
app.listen(config.port, config.host, () => console.log(`Server is now listening on port ${config.port}.`));
