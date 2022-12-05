import mongoose, {
    Connection
} from "mongoose";
import config from "$config";
let documentConnection: Connection;

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "documents",
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
};

documentConnection = mongoose.createConnection(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`, connectionOptions);

documentConnection.on("error", (err) => {
    console.error(err);
    throw err;
});

documentConnection.on("open", () => {
    console.log("Connected to document database");
});

documentConnection.on("close", () => {
    console.log("Document database connection closed. Retrying to connect...");
    let retries = 0;
    const retryInterval = setInterval(() => {
        if (retries >= 5) {
            clearInterval(retryInterval);
            throw new Error("Could not connect to document database");
        }

        retries++;
        documentConnection.openUri(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`, connectionOptions);
    }, 1000);
});

export default documentConnection;
