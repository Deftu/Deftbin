import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import store from "connect-mongo";
import {
    User
} from "$db/schemas";

import config from "$config";

export default function createApp() {
    const app = express();

    app.use(cors({
        credentials: true
    }));
    app.use(express.raw());
    app.use(express.text());
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

    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findOne({
                id: id
            });
            return user ? done(null, user) : done(null, null);
        } catch (err) {
            console.log(err);
            done(err, null);
        }
    });

    return app;
}
