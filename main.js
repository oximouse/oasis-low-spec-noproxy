import { readToken, delay } from "./utils/file.js";
import { createConnection } from "./utils/websocket.js";
import { showBanner } from "./utils/banner.js";
import { logger } from "./utils/logger.js";

async function start() {
    showBanner();
    const tokens = await readToken("providers.txt");

    // Create connections using only tokens
    for (const token of tokens) {
        await createConnection(token);
        await delay(5000);
    }
}

start();
