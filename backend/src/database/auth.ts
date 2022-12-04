import mongoose, {
    Connection
} from "mongoose";
import config from "$config";
let authConnection: Connection;

try {
    authConnection = mongoose.createConnection(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`, {
        dbName: "auth"
    });

    console.log("Connected to auth database.");
} catch (err) {
    console.error(err);
    throw new Error("Could not connect to auth database.");
}

export default authConnection;
