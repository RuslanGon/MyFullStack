import { initMongoConnection } from "./db/initMongoConnection.js";
import { startServer } from "./server.js";

(async() => {
    initMongoConnection();
    startServer();
})();

