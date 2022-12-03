import AuthHandler from "../auth";
import config from "../config";
import passport from "passport";
import {
    Strategy as GitHubStrategy,
    Profile as GitHubProfile
} from "passport-github2";
import {
    VerifyCallback
} from "passport-oauth2";
import {
    Express,
    Router
} from "express";
import {
    User
} from "../database/schemas";
import * as utils from "../utils";

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findOne({
            id: id
        });
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err);
        return done(err, null);
    }
});

passport.use(new GitHubStrategy({
    clientID: config.authentication.github.clientId,
    clientSecret: config.authentication.github.clientSecret,
    callbackURL: config.authentication.github.redirectUri,
    scope: ["user:email"]
}, async (
    accessToken: string,
    refreshToken: string,
    profile: GitHubProfile,
    done: VerifyCallback
) => {
    const {
        id: githubId
    } = profile;
    try {
        // find existing user with github id
        const existingUser = await User.findOneAndUpdate(
            {
                "connections.github.id": githubId
            },
            {
                $set: {
                    connections: {
                        github: {
                            id: githubId,
                            username: profile.username
                        }
                    }
                }
            },
            {
                new: true
            }
        );
        if (existingUser) return done(null, existingUser);

        // create new user
        const userId = utils.generateUserId();
        const newUser = await User.create({
            id: userId,
            username: profile.username,
            email: profile.emails?.[0].value,
            connections: {
                github: {
                    id: githubId,
                    username: profile.username
                }
            }
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
    } catch (err) {
        console.log(err);
        return done(err as any, undefined);
    }
}));

export default class GitHubAuthHandler implements AuthHandler {
    setup(express: Express, router: Router) {
        router.get("/github", passport.authenticate("github"), (req, res) => {
            res.sendStatus(200);
        });

        router.get("/github/redirect", passport.authenticate("github", {
            failureRedirect: "/auth/github"
        }), (req, res) => {
            res.redirect(config.frontend.host + (config.frontend.port ? `:${config.frontend.port}` : "") + "/profile");
        });
    }
}
