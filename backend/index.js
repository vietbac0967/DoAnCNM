import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongo from "./src/config/connectDB.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/", userRoutes);

// const date = new Date();
/// create a new variable to hold the current date plus 15 days
// const datePlus15Days = new Date(date.setDate(date.getDate() + 15));
app.listen(PORT, () => {
  // console.log(datePlus15Days);  
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
