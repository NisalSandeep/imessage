import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import dns from "dns";
import cors from "cors";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js";

import { clerkMiddleware } from "@clerk/express";
import clerkWebhook from "./webhooks/clerk.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

app.use("/api/webhooks/clerk",express.raw({type:"application/json"}), clerkWebhook)

app.use(express.json()); // This allows us to use express JSON parser
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
  if (process.env.NODE_ENV === "production") job.start();
});
