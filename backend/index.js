import dotenv from "dotenv";
dotenv.config();
import connectToMongo from "./src/config/connectDB.js";
const PORT = process.env.PORT || 5000;
import { server } from "./src/config/configSocket.js";
import swaggerDocs from "./src/helpers/swagger.js";

server.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
