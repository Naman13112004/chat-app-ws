import express from "express";
import { log } from "./utils/logger.js";
import { initWebSocket } from "./websocket.js";
import { createServer } from "http";

const app = express();
const PORT = 3000;

const httpServer = createServer(app);

initWebSocket(httpServer);

httpServer.listen(PORT, () => {
    log("server", `HTTP and Websocket server running on http://localhost:${PORT}`);
});