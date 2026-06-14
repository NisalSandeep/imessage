import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import dns from "dns";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json()); // This allows us to use express JSON parser
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
