"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeeSchema = new mongoose_1.Schema({
    fullName: { type: String },
    position: { type: String },
    location: { type: String },
    salary: { type: Number }
});
exports.default = (0, mongoose_1.model)('Employee', EmployeeSchema);
