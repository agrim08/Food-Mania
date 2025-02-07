import express from "express";
import { connectDb } from "./utils/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: ".env",
  });
}

app.use(
  cors({
    origin: "http://localhost:1234/",
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    preflightContinue: false,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use("/", authRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client", "dist", "index.html"));
  });
}

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
