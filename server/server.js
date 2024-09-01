import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectDatabase from "./utils/connectDatabase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase();
});
