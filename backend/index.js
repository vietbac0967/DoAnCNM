import dotenv from "dotenv";
dotenv.config();
import connectToMongo from "./src/config/connectDB.js";
const PORT = process.env.PORT || 5000;
import { server } from "./src/config/configSocket.js";
import { connectToRedis } from "./src/config/connectToRedis.js";

server.listen(PORT, () => {
  connectToMongo();
  connectToRedis();
  console.log(`Server is running on port ${PORT}`);
});
