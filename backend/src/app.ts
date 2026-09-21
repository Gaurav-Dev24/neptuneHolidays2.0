// This is the main server configration file
import express from "express";
import cors from "cors";
import airportRoutes from "./routes/airport.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

// Initializing express app
const app = express();

// CORS configuration
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Neptune local API is running",
    });
});

// User Routes
app.use("/api/v1/user/airports", airportRoutes);

// Must be registered after the routes
app.use(errorHandler);

export default app;