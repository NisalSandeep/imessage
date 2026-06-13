import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backendd!" });
});

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
