"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDB {
    constructor() {
        this.connection = null;
    }
    connect(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                mongoose_1.default.set("strictQuery", false);
                yield mongoose_1.default.connect(uri);
                this.connection = mongoose_1.default.connection;
                console.log('Connected to MongoDB!');
            }
            catch (err) {
                console.error('Failed to connect to MongoDB:', err);
                throw err;
            }
        });
    }
    getConnection() {
        if (this.connection) {
            return this.connection;
        }
        else {
            throw new Error('You must connect to MongoDB before calling this method!');
        }
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                yield this.connection.close();
                this.connection = null;
                console.log('Disconnected from MongoDB!');
            }
        });
    }
}
exports.default = MongoDB;
