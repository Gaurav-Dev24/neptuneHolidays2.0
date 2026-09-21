"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_js_1 = require("../errors/AppError.js");
const errorHandler = (error, _req, res, _next) => {
    console.error(error);
    if (error instanceof AppError_js_1.AppError) {
        return res.status(error.statusCode).json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    }
    return res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
        },
    });
};
exports.errorHandler = errorHandler;
