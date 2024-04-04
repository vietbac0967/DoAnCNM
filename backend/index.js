import app from "./app.js";

import dotenv from "dotenv";
dotenv.config();
import connectToMongo from "./src/config/connectDB.js";
import moment from "moment-timezone";
const PORT = process.env.PORT || 5000;
const data = {
  username: "vietbacnguyen2002@gmail.com",
  password: "Vip@12345",
};

app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
