const io = require("socket.io");

let socketInstance;

function initializeSocket(server) {
  if (!server) {
    throw new Error("Server is not defined");
  }

  if (!socketInstance) {
    socketInstance = io(server, {
      cors: {
        origin: "http://localhost:5173", // Allow requests from this origin
        methods: ["GET", "POST", "PUT"], // Allow only GET and POST requests
        credentials: true, // Allow cookies to be sent with requests
      },
    });
    // const address = server.address().address;
    // const port = server.address().port;
    console.log(`Socket.IO server running on `);
  }

  return socketInstance;
}

module.exports = { initializeSocket };
