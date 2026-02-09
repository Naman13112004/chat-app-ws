let socket;

export const initiateSocketConnection = (onMessageReceived, onStatusChange) => {
    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
        onStatusChange("Connected");
        console.log("Websocket Connected...");
    }

    socket.onmessage = (event) => {
        onMessageReceived(event.data);
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
        socket.send(message);
    }
}