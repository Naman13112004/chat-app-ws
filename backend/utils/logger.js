// A simple utility to format our logs so we can see the flow of events clearly.
export const log = (event, message) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 🚀 ${event.toUpperCase()}: ${message}`);
};