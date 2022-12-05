import mongoose, {
    Connection
} from "mongoose";
import config from "$config";
let authConnection: Connection;

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "auth",
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
};

authConnection = mongoose.createConnection(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`, connectionOptions);

authConnection.on("error", (err) => {
    console.error(err);
    throw err;
});

authConnection.on("open", () => {
    console.log("Connected to auth database");
});

authConnection.on("close", () => {
    console.log("Auth database connection closed. Retrying to connect...");
    let retries = 0;
    const retryInterval = setInterval(() => {
        if (retries >= 5) {
            clearInterval(retryInterval);
            throw new Error("Could not connect to auth database");
        }

        retries++;
        authConnection.openUri(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`, connectionOptions);
    }, 1000);
});

export default authConnection;
