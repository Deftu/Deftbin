import mongoose, {
    Connection
} from "mongoose";
import config from "$config";
let documentConnection: Connection;

try {
    documentConnection = mongoose.createConnection(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`, {
        dbName: "documents"
    });

    console.log("Connected to document database.");
} catch (err) {
    console.error(err);
    throw new Error("Could not connect to document database.");
}

export default documentConnection;
