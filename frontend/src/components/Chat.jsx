import { useEffect, useRef, useState } from "react";
import { initiateSocketConnection, sendMessage } from "../services/socket";
import "./Chat.css"

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState("Connecting...");
    const [input, setInput] = useState("");

    const scrollRef = useRef(null);

    useEffect(() => {
        initiateSocketConnection(
            (newMessage) => {
                setMessages((prev) => [...prev, newMessage]);
            },
            (newStatus) => setStatus(newStatus)
        )
    }, []);

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput("");
        }
    }

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h2>WebSocket Chat 💬</h2>
                <div className={`status-indicator ${status.toLowerCase()}`}>
                    {status}
                </div>
            </header>

            <div className="message-area">
                {messages.map((msg, i) => (
                    <div key={i} className="message-bubble fade-in">
                        {msg}
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            <form className="input-area" onSubmit={handleSend}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit" disabled={status !== 'Connected'}>
                    Send
                </button>
            </form>
        </div>
    );
}