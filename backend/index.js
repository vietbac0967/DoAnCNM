import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongo from "./src/config/connectDB.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import messageRoutes from "./src/routes/message.routes.js";
import groupRoutes from "./src/routes/group.routes.js";

import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { configCORS } from "./src/config/configCORS.js";
import { SocketSetup } from "./src/socket/SocketSetup.js";
import { createServer } from 'http'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//socket
const server = createServer(app);


app.use(express.json());
configCORS(app)
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//config socket
SocketSetup(server)

app.use("/api/auth", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", messageRoutes);
app.use("/api/", messageRoutes);
app.use("/api/group/", groupRoutes);


// const date = new Date();
/// create a new variable to hold the current date plus 15 days
// const datePlus15Days = new Date(date.setDate(date.getDate() + 15));
server.listen(PORT, () => {
  // console.log(datePlus15Days);  
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
