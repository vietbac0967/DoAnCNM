import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
const app = express();


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use("/api/auth", authRoutes);
app.use("/api/", userRoutes);

export default app;