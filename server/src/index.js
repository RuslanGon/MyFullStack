import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { startServer } from "./server.js";
import { createFolderTemp } from "./utils/createFolderTemp.js";

(async() => {
    await initMongoConnection();
    await createFolderTemp(TEMP_UPLOAD_DIR);
    await createFolderTemp(UPLOAD_DIR);
    startServer();
})();

