const clientId = Math.random().toString(36).substring(2,9);

let socket;

export const initiateSocketConnection = (onMessageReceived, onStatusChange) => {
    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
        onStatusChange("Connected");
        console.log("Websocket Connected...");
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessageReceived(data);
    }

    socket.onclose = () => {
        onStatusChange("Disconnected");
        console.log("Websocket Disconnected...");
    }

    socket.onerror = (error) => {
        console.error("Websocket error: " + error);
    }
}

export const sendMessage = (message) => {
    if(socket && socket.readyState === WebSocket.OPEN) {
        const messagePayload = {
            senderId: clientId,
            text: message,
            timeStamp: new Date().toLocaleTimeString()
        }
        socket.send(JSON.stringify(messagePayload));
    }
}

export { clientId };