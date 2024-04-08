import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import connectToMongo from "./src/config/connectDB.js";
import http from "http";
import configSocket from "./src/config/configSocket.js";
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
configSocket(server);
server.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
