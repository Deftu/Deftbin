import config from "$config";
import passport from "passport";
import {
    Strategy as GitHubStrategy,
    Profile as GitHubProfile
} from "passport-github2";
import {
    VerifyCallback
} from "passport-oauth2";
import {
    Router
} from "express";
import {
    User
} from "$db/schemas";
import * as id from "$utils/id";

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
                $or: [{
                    "connections.github.id": githubId
                }, {
                    email: profile.emails?.[0].value
                }]
            },
            {
                $set: {
                    email: profile.emails?.[0].value,
                    avatar: profile.photos?.[0].value,
                    username: profile.username,
                    "connections.github": {
                        id: githubId,
                        username: profile.username,
                    }
                }
            },
            {
                new: true
            }
        );
        if (existingUser) return done(null, existingUser);

        // create new user
        const userId = id.generateId();
        const newUser = await User.create({
            id: userId,
            username: profile.username,
            avatar: profile.photos?.[0].value,
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

const githubRouter = Router();

githubRouter.get("/", passport.authenticate("github"), (req, res) => {
    res.sendStatus(200);
});

githubRouter.get("/redirect", passport.authenticate("github", {
    failureRedirect: "/auth/github"
}), (req, res) => {
    res.redirect(config.frontend.host + (config.frontend.port ? `:${config.frontend.port}` : "") + "/profile");
});

export default githubRouter;
