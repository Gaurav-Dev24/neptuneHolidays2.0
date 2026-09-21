"use strict";
// This is the error class for custom errors
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    code;
    constructor(message, statusCode = 500, code = "INTERNAL_SERVER_ERROR") {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
        // maintaining proper stack trace
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
