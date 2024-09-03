import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectDatabase from "./utils/connectDatabase.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running!`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Timestamp: ${new Date().toISOString()}`);
  connectDatabase();
});
