import app from "./app.js";

import dotenv from "dotenv";
dotenv.config();
import connectToMongo from "./src/config/connectDB.js";
const PORT = process.env.PORT || 5000;
// how to update many in mongodb
// db.users.updateMany({}, { $set: { is_online: "0" } });
app.listen(PORT, () => {
  connectToMongo();
  // generateData();
  console.log(`Server is running on port ${PORT}`);
});
