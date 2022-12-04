import setupDir from "$init/setupDir";
setupDir();
import config from "$config";

import createApp from "$init/createApp";
const app = createApp();
import "$db/auth"; // Connect to auth database
import "$db/document"; // Connect to document database
import documentRouter from "$documents/routing";
import authRouter from "$auth";

app.use("/documents", documentRouter);
app.use("/auth", authRouter);

// Start the application / Listen for requests
app.listen(config.port, config.host, () => console.log(`Server is now listening on port ${config.port}.`));
