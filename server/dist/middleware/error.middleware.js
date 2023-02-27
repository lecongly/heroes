"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundRoute = void 0;
const http_exception_1 = __importDefault(require("../utils/exception/http.exception"));
function notFoundRoute(_req, _res, next) {
    next(new http_exception_1.default(404, "404 Not Found"));
}
exports.notFoundRoute = notFoundRoute;
function errorMiddleware(error, req, res, _next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
    });
}
exports.default = errorMiddleware;
