import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db/index.db.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import  userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
connectDB();

const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/captains", captainRoutes);




export default app;