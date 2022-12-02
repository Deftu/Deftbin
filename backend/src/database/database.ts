// Set up Mongooose
import mongoose from "mongoose";
import config from "../config";
mongoose.connect(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`)
    .then(() => console.log("Connected to MongoDB."))
    .catch((err) => {
        console.error("Could not connect to database! This is required for Deftbin to work properly.", err);
        process.exit(1);
    });
