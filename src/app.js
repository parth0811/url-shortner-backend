import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongo.config.js"; 
import short_url from "./routes/short_url.route.js";
import user_routes from "./routes/user.routes.js";
import auth_routes from "./routes/auth.routes.js";
import { redirectFromShortUrl } from "./controllers/short_url.controller.js";
import { errorHandler } from "./utils/errorHandler.js";
import { attachUser } from "./utils/attachUser.js";

dotenv.config();

const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);


app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);


app.use(errorHandler);


const PORT = process.env.PORT || 3000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" Failed to connect to MongoDB:", err.message);
        process.exit(1);
    });
