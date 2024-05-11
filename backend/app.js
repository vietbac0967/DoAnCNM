import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import messageRoutes from "./src/routes/message.routes.js";
import groupRoutes from "./src/routes/group.routes.js";
import converstationRoutes from "./src/routes/converstation.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import express from "express";
import { configCORS } from "./src/config/configCORS.js";
import adminRoutes from "./src/routes/admin.routes.js";
import swaggerSpec from "./src/helpers/swagger.js";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
  })
);
// app.use(cors());
// app.options("*", cors());
app.use(
  cors({
    origin: ["*", process.env.URL_WEB,"http://localhost:8081"],
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    exposedHeaders: ["Authorization"],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", messageRoutes);
app.use("/api/group/", groupRoutes);
app.use("/api/conversation/", converstationRoutes);
app.use("/api/notification/", notificationRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// export default app;
export default app;
