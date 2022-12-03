import AuthHandler from "../auth";
import config from "../config";
import passport from "passport";
import {
    Strategy as DiscordStrategy,
    Profile as DiscordProfile
} from "passport-discord";
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
        console.log("Deserialized user", user);
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err);
        return done(err, null);
    }
});

passport.use(new DiscordStrategy({
    clientID: config.authentication.discord.clientId,
    clientSecret: config.authentication.discord.clientSecret,
    callbackURL: config.authentication.discord.redirectUri,
    scope: ["identify", "connections"]
}, async (
    accessToken: string,
    refreshToken: string,
    profile: DiscordProfile,
    done: VerifyCallback
) => {
    try {
        // find existing user with discord id
        const github = profile.connections?.find((connection: any) => connection.type === "github");
        // find existing user with either github or discord id
        // update existing user's data with new data
        const existingUser = await User.findOneAndUpdate(
            {
                $or: [
                    {
                        "connections.discord.id": profile.id
                    },
                    {
                        "connections.github.id": github?.id
                    }
                ]
            },
            {
                $set: {
                    avatar: profile.avatar,
                    connections: {
                        discord: {
                            id: profile.id,
                            username: profile.username,
                            discriminator: profile.discriminator
                        },
                        github: {
                            id: github?.id,
                            username: github?.name
                        }
                    }
                }
            },
            { new: true }
        );
        if (existingUser) return done(null, existingUser);

        let userId = utils.generateUserId();
        const newUser = new User({
            // generate an ID for the user
            id: userId,
            username: profile.username,
            connections: {
                discord: {
                    id: profile.id,
                    username: profile.username,
                    discriminator: profile.discriminator
                },
                github: {
                    id: github?.id,
                    username: github?.name
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

export default class DiscordAuthHandler implements AuthHandler {
    setup(express: Express, router: Router) {
        router.get("/discord", passport.authenticate("discord"), (req, res) => {
            res.sendStatus(200);
        });

        router.get("/discord/redirect", passport.authenticate("discord", {
            failureRedirect: "/auth/discord"
        }), (req, res) => {
            res.redirect(config.frontend.host + (config.frontend.port ? `:${config.frontend.port}` : "") + "/profile");
        });
    }
}
