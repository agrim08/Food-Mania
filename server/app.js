import express from "express";
import { connectDb } from "./utils/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import cors from "cors";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: ".env",
  });
}
const corsConfig = cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  preflightContinue: false,
});

app.options("", cors(corsConfig));
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

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
