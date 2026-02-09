import { WebSocketServer } from "ws";
import { log } from "./utils/logger.js";

export const initWebSocket = (server) => {
    const wss = new WebSocketServer({ server });
    log("server", "Websocket server initialised");

    wss.on("connection", (socket) => {
        log("connection", "A new client joined on websocket server");

        socket.on("message", (data) => {
            const message = data.toString();
            log("message", message);

            wss.clients.forEach((client) => {
                if(client.readyState === 1) {
                    client.send(message);
                }
            });
        });

        socket.on("close", () => {
            log("disconnect", "A client left the chat.");
        });

        socket.on("error", (error) => {
            log("error", error.message);
        });
    });
}