import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"


import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/routecontrol.js"
import taskRoutes from "./routes/taskroutecontrol.js"

import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

const app=express()
dotenv.config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
  }));


app.use("/uploads", express.static(uploadsDir));
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes)


app.listen(3050,()=>{
    console.log("server is running on port 3050");
    connectDB()
})