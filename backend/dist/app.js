"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This is the main server configration file
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const airport_routes_js_1 = __importDefault(require("./routes/airport.routes.js"));
const error_handler_js_1 = require("./middleware/error-handler.js");
// Initializing express app
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Neptune local API is running",
    });
});
// User Routes
app.use("/api/v1/user/airports", airport_routes_js_1.default);
// Must be registered after the routes
app.use(error_handler_js_1.errorHandler);
exports.default = app;
