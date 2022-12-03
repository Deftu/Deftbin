import mongoose from "mongoose";
import config from "../config";
const authConnection = mongoose.createConnection(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`, {
    dbName: "auth"
});

export default authConnection;
