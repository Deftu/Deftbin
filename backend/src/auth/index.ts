import {
    Router
} from "express";
import config, {
    AuthType
} from "$config";

if (config.authentication.types.length < 1) throw new Error("No authentication types specified in config");

import defaultRouter from "$auth/default";
import discordRouter from "$auth/discord";
import githubRouter from "$auth/github";

const authRouter = Router();

authRouter.get("/", (req, res) => {
    if (req.user) {
        res.json({
            "authenticated": true,
            "user": req.user
        });
    } else res.json({
        "authenticated": false
    });
});

authRouter.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) {
            res.status(500).json({
                "success": false,
                "error": err
            });
        } else {
            res.json({
                "success": true,
                "error": null
            });
        }
    });
});

authRouter.use("/default", defaultRouter);
if (config.authentication.types.includes(AuthType.Discord)) authRouter.use("/discord", discordRouter);
if (config.authentication.types.includes(AuthType.GitHub)) authRouter.use("/github", githubRouter);

export default authRouter;
