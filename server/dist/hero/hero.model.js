"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HeroSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    gender: Boolean,
    mail: String,
    age: Number,
    address: String,
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
});
exports.default = (0, mongoose_1.model)('Hero', HeroSchema);
