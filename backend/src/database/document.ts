import mongoose from "mongoose";
import config from "../config";
const documentConnection = mongoose.createConnection(`mongodb://${config.database.host}${config.database.port ? `:${config.database.port}` : ""}`, {
    dbName: "documents"
});

export default documentConnection;
