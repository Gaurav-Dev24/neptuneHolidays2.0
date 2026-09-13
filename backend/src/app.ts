import express from "express";
import cors from "cors";

const app = express();

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

export default app;