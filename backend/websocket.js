import { WebSocketServer } from "ws";
import { log } from "./utils/logger.js";

export const initWebSocket = (server) => {
    const wss = new WebSocketServer({ server });
    log("server", "Websocket server initialised");

    wss.on("connection", (socket) => {
        log("connection", "A new client joined on websocket server");

        socket.on("message", (data) => {
            const payload = JSON.parse(data);

            if (payload.type === "JOIN") {
                socket.roomCode = payload.roomCode;
                log("join", `User joined room: ${payload.roomCode}`);
                return;
            }

            else if (payload.type === "CHAT") {
                wss.clients.forEach((client) => {
                    const message = JSON.stringify(payload);
                    if (client.readyState === 1 && client.roomCode === payload.roomCode) {
                        client.send(message);
                    }
                });
            }
        });

        socket.on("close", () => {
            log("disconnect", "A client left the chat.");
        });

        socket.on("error", (error) => {
            log("error", error.message);
        });
    });
}