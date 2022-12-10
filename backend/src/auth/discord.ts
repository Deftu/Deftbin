import config from "$config";
import passport from "passport";
import {
    Strategy as DiscordStrategy,
    Profile as DiscordProfile
} from "passport-discord";
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

function makeAvatarUrl(
    id: string,
    hash: string
) {
    return `https://cdn.discordapp.com/avatars/${id}/${hash}.png`;
}

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
                $or: [{
                    "metadata.connections.discord.id": profile.id
                },
                {
                    "metadata.connections.github.id": github?.id
                }, {
                    email: profile.email
                }]
            },
            {
                $set: {
                    email: profile.email,
                    "metadata.username": profile.username,
                    "metadata.avatar": makeAvatarUrl(profile.id, profile.avatar),
                    "metadata.connections.discord.id": profile.id,
                    "metadata.connections.discord.username": profile.username,
                    "metadata.connections.discord.discriminator": profile.discriminator,
                    "metadata.connections.github.id": github?.id,
                    "metadata.connections.github.username": github?.name
                }
            },
            {
                new: true
            }
        );
        if (existingUser) return done(null, existingUser);

        let userId = id.generateId();
        const newUser = new User({
            // generate an ID for the user
            id: userId,
            email: profile.email,
            metadata: {
                username: profile.username,
                avatar: makeAvatarUrl(profile.id, profile.avatar),
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
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
    } catch (err) {
        console.log(err);
        return done(err as any, undefined);
    }
}));

const discordRouter = Router();

discordRouter.get("/", passport.authenticate("discord"), (req, res) => {
    res.sendStatus(200);
});

discordRouter.get("/redirect", passport.authenticate("discord", {
    failureRedirect: "/auth/discord"
}), (req, res) => {
    res.redirect(config.frontend.host + (config.frontend.port ? `:${config.frontend.port}` : "") + "/profile");
});

export default discordRouter;
